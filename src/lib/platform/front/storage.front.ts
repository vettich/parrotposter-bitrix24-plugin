import { getCookie, setCookie } from 'typescript-cookie';
import type { PlatformStorage } from '../platform-types';

const CookieStorage: PlatformStorage = {
	get(name: string): Promise<string> {
		return new Promise(resolve => {
			resolve(getCookie(name));
		});
	},

	set(name: string, value: string): Promise<void> {
		return new Promise(resolve => {
			setCookie(name, value, { expires: 365, path: '/' });
			resolve();
		});
	},
}

export {
	CookieStorage,
}
