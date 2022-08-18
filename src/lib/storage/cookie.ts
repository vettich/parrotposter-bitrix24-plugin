import { getCookie, setCookie } from 'typescript-cookie';
import type { StorageAdapter } from './types';

const CookieAdapter: StorageAdapter = {
	canUse(): boolean {
		return !!document.cookie;
	},

	get(name: string): Promise<string> {
		return new Promise(resolve => {
			resolve(getCookie(name));
		});
	},

	set(name: string, value: string): Promise<void> {
		return new Promise(resolve => {
			setCookie(name, value, { expires: 365 });
			resolve();
		});
	},
}

export {
	CookieAdapter,
}
