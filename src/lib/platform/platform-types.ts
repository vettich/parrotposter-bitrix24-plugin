import type { ComponentType } from 'svelte'
import type { Platform } from '@src/types'

interface PlatformAdapter {
	// return true if application running on platform
	detect(): boolean
	// return Platform type
	getType(): Platform
	// need open link in new window?
	openInNewWindow(): boolean
	// return platform name, such as domain on BX24
	name(): string
	// running some init steps
	init(): void
	// return Init component for integrate to App.svelte
	initComponent(): ComponentType
	// return storage using on platform
	store(): PlatformStorage
}

interface PlatformStorage {
	get(key: string): Promise<string>
	set(key: string, value: string): void
}

export type {
	PlatformAdapter,
	PlatformStorage,
}
