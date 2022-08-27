type AuthTokenSubsFn = (setted: boolean, token?: string) => void;

class TokenManager {
	private token: string;
	private subscriptions: AuthTokenSubsFn[] = [];

	get(): string {
		return this.token;
	}

	has(): boolean {
		return !!this.token?.length;
	}

	set(token: string) {
		this.token = token;
		this.emitChange();
	}

	onChange(fn: AuthTokenSubsFn) {
		this.subscriptions.push(fn)

		// instant emit if token was set
		if (this.has()) {
			fn(true, this.token)
		}
	}

	private emitChange() {
		this.subscriptions.every(fn => fn(this.has(), this.token))
	}
}

export {
	type AuthTokenSubsFn,
	TokenManager,
}
