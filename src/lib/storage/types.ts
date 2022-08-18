interface StorageAdapter {
	canUse(): boolean,
	get(name: string): Promise<string>,
	set(name: string, value: string): Promise<void>,
}

export type {
	StorageAdapter,
}
