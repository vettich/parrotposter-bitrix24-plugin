import type { PlatformAdapter } from '../platform-types';
import { CookieStorage } from './storage.front';

const FrontAdapter: PlatformAdapter = {
	detect() { return true },
	name() { return '' },
	getType() { return 'front' },
	openInNewWindow() { return true },
	init() {},
	initComponent() { return null },
	store() { return CookieStorage },
}

export {
	FrontAdapter,
}
