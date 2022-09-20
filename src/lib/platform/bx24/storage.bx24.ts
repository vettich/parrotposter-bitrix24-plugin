import type { PlatformStorage } from '../platform-types';
import { getBX24 } from './bx24';

const BX24Storage: PlatformStorage = {
	get(name: string): Promise<string> {
		return new Promise(async (resolve) => {
			const BX24 = await getBX24();
			BX24.init(() => {
				resolve(BX24.appOption.get(name));
			})
		});
	},

	set(name: string, value: string): Promise<void> {
		return new Promise(async (resolve) => {
			const BX24 = await getBX24();
			BX24.init(() => {
				BX24.appOption.set(name, value, resolve)
			})
		});
	},
}

export {
	BX24Storage,
}
