import type { StorageAdapter } from './types';
import { BX24 } from '@src/lib/bx24';

const BX24Adapter: StorageAdapter = {
	canUse(): boolean {
		return !!BX24;
	},

	get(name: string): Promise<string> {
		return new Promise(resolve => {
			BX24.init(() => {
				resolve(BX24.appOption.get(name));
			})
		});
	},

	set(name: string, value: string): Promise<void> {
		return new Promise(resolve => {
			BX24.init(() => {
				BX24.appOption.set(name, value, resolve)
			})
		});
	},
}

export {
	BX24Adapter,
}
