declare const __WS_URI__: string;

interface MessageStart {
	type: 'start',
	token: string,
	target: 'posts' | string,
}

interface MessageStop {
	type: 'stop',
}

interface MessageReply {
	type: 'add' | 'change' | 'remove',
	data: any,
}

type Message = MessageStart | MessageStop;

class Subscription {
	onadd: (data: any) => void;
	onupdate: (data: any) => void;
	onremove: (id: string) => void;

	private target: string;
	private token: string;
	private ws: WebSocket = null;
	private reconnectId: NodeJS.Timeout;
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

		this.ws = new WebSocket(__WS_URI__);

		this.ws.onopen = () => this.wsOnOpen();
		this.ws.onclose = (e) => this.wsOnClose(e);
		this.ws.onmessage = (evt) => this.wsOnMessage(evt);
		this.ws.onerror = (e) => this.wsOnError(e);
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
		console.log('sendMessage', 'available', this.available())
		if (!this.available()) return;

		const json = JSON.stringify(data);
		console.log('sendMessage', 'data', json)
		this.ws.send(json);
	}

	private wsOnOpen() {
		console.log('wsOnOpen', 'token:', !!this.token, 'available:', this.available())
		if (!this.token || !this.available()) return;

		// init subscription
		this.sendMessage({
			type: 'start',
			token: this.token,
			target: this.target,
		});
	}

	private wsOnClose(evt: CloseEvent) {
		console.log('closed ws', evt);
		this.reconnect();
	}

	private wsOnMessage(evt: MessageEvent) {
		console.log(evt.data);

		const res: MessageReply = JSON.parse(evt.data);

		if (res.type === 'add') {
			if (this.onadd) this.onadd(res.data);
		} else if (res.type === 'change') {
			if (this.onupdate) this.onupdate(res.data);
		} else if (res.type === 'remove') {
			if (this.onremove) this.onremove(res.data.id);
		}
	}

	private wsOnError(evt: Event) {
		console.log('error ws', evt);
		this.reconnect();
	}
}

export {
	Subscription,
}
