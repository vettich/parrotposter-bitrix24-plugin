import type { PlatformAdapter, PlatformStorage } from '../platform-types';
import { BX24, getBX24 } from './bx24';
import { BX24Storage } from './storage.bx24';
import Init from './Init.svelte';

function detect(): boolean {
	if (!!window?.name) {
		const q = window.name.split('|');
		return q.length > 0;
	}
}

function name(): string {
	if (!detect()) return "";

	const q = window.name.split('|');
	const domain = q[0].replace(/\:(80|443)$/, '');
	return domain;
}

async function init() {
	(await getBX24())?.install(() => {
		BX24.installFinish();
	});

	// observe document.title and change title in BX24 app
	new MutationObserver(async () => {
		BX24?.setTitle(document.title);
	}).observe(
		document.querySelector('title'),
		{ subtree: true, characterData: true, childList: true },
	)
}

function store(): PlatformStorage {
	return BX24Storage;
}

const BX24Adapter: PlatformAdapter = {
	detect,
	name,
	getType() { return 'bitrix24' },
	openInNewWindow() { return true },
	init,
	initComponent: () => Init,
	store,
}

export {
	BX24Adapter,
}
