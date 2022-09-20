import type { PlatformAdapter, PlatformStorage } from './platform-types';
import type { ComponentType } from 'svelte';
import type { Platform as PlatformType } from '@src/types';
import { BX24Adapter } from './bx24';
import { FrontAdapter } from './front';

class Platform {
	private adapter: PlatformAdapter;

	constructor() {
		if (BX24Adapter.detect()) {
			this.adapter = BX24Adapter;
		} else {
			this.adapter = FrontAdapter;
		}

		this.adapter.init();
	}

	openInNewWindow(): boolean {
		return this.adapter.openInNewWindow();
	}

	name(): string {
		return this.adapter.name();
	}

	getType(): PlatformType {
		return this.adapter.getType();
	}

	store(): PlatformStorage {
		return this.adapter.store();
	}

	init() {
		this.adapter.init();
	}

	initComponent(): ComponentType {
		return this.adapter.initComponent();
	}
}

const platform = new Platform();

export {
	Platform,
	platform,
}
