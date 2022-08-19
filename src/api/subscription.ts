const wsURI = 'wss://parrotposter.com/api/v1/subscriptions';

interface MessageStart {
	type: 'start',
	token: string,
	target: 'posts' | string,
}

interface MessageStop {
	type: 'stop',
}

interface MessagePing {
	type: 'ping',
}

interface MessageReply {
	type: 'add' | 'change' | 'remove',
	data: any,
}

type Message = MessageStart | MessageStop | MessagePing;

class Subscription {
	onadd: (data: any) => void;
	onupdate: (data: any) => void;
	onremove: (id: string) => void;

	private target: string;
	private token: string;
	private ws: WebSocket = null;
	private reconnectId: NodeJS.Timeout;
	private pingSendingId: NodeJS.Timer;
	private manuallyStoped = false;

	constructor(token: string, target: string) {
		this.token = token;
		this.target = target;
	}

	async start() {
		this.connect();
	}

	async stop() {
		this.sendMessage({ type: 'stop' })
		this.manuallyStoped = true;
		setTimeout(() => {
			this.ws.close();
		}, 200)
	}

	private connect() {
		if (this.ws && this.ws.readyState === 1) return;

		this.ws = new WebSocket(wsURI);

		this.ws.onopen = () => this.wsOnOpen();
		this.ws.onclose = () => this.wsOnClose();
		this.ws.onmessage = (evt) => this.wsOnMessage(evt);
		this.ws.onerror = () => this.wsOnError();
	}

	private reconnect() {
		clearTimeout(this.reconnectId);

		if (this.manuallyStoped) return;

		this.reconnectId = setTimeout(() => {
			this.connect();
		}, 1000);
	}

	private available() {
		return this.ws && this.ws.readyState === 1;
	}

	private sendMessage(data: Message) {
		if (!this.available()) return;

		const json = JSON.stringify(data);
		this.ws.send(json);
	}

	private wsOnOpen() {
		if (!this.token || !this.available()) return;

		// init subscription
		this.sendMessage({
			type: 'start',
			token: this.token,
			target: this.target,
		});

		// ping sending every 5s
		clearInterval(this.pingSendingId)
		this.pingSendingId = setInterval(() => {
			this.sendMessage({ type: 'ping' })
		}, 5000);
	}

	private wsOnClose() {
		this.reconnect();
	}

	private wsOnMessage(evt: MessageEvent) {
		const res: MessageReply = JSON.parse(evt.data);
		
		if (res.type === 'add') {
			if (this.onadd) this.onadd(res.data);
		} else if (res.type === 'change') {
			if (this.onupdate) this.onupdate(res.data);
		} else if (res.type === 'remove') {
			if (this.onremove) this.onremove(res.data.id);
		}
	}

	private wsOnError() {
		this.reconnect();
	}
}

export {
	Subscription,
}
