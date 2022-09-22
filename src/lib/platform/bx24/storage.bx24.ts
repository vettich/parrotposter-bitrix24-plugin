import type { PlatformStorage } from '../platform-types';
import { getBX24 } from './bx24';

const prefix = 'pp-';

const BX24Storage: PlatformStorage = {
	get(name: string): Promise<string> {
		name = prefix + name;
		return new Promise(async (resolve) => {
			const BX24 = await getBX24();
			BX24.init(() => {
				resolve(BX24.appOption.get(name));
			})
		});
	},

	set(name: string, value: string): Promise<void> {
		name = prefix + name;
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
