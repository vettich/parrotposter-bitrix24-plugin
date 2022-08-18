import type { StorageAdapter } from './types';
import { BX24Adapter } from './bx24';
import { CookieAdapter } from './cookie';

class Storage {
	adapter: StorageAdapter;

	constructor() {
		if (BX24Adapter.canUse()) {
			this.adapter = BX24Adapter;
		} else if (CookieAdapter.canUse()) {
			this.adapter = CookieAdapter;
		} else {
			throw new Error('Cannot use any storage adapter');
		}
	}

	async get(name: string): Promise<string> {
		return await this.adapter.get(name);
	}

	async set(name: string, value: string) {
		await this.adapter.set(name, value);
	}
}

const storage = new Storage();

export {
	Storage,
	storage,
}
