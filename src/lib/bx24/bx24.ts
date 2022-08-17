declare const window: any;

const BX24: BX24 | null = window.BX24;

interface BX24 {
	init(fn: () => void): void,
	setTitle(title: string, callback?: () => void): void,
	appOption: {
		set(name: string, value: string, callback?: () => void): void,
		get(name: string): string | null,
	},
}

export {
	BX24,
}
