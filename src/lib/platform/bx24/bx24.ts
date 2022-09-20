declare const window: any;

let BX24: BX24 | null = window?.BX24;

interface BX24 {
	install(fn: () => void): void,
	installFinish(): void,
	init(fn: () => void): void,
	setTitle(title: string, callback?: () => void): void,
	appOption: {
		set(name: string, value: string, callback?: () => void): void,
		get(name: string): string | null,
	},
}

async function getBX24(): Promise<BX24> {
	return new Promise(resolve => {
		if (!window) resolve(null);

		if (BX24) {
			resolve(BX24);
			return;
		}

		const id = setInterval(() => {
			if (!window.BX24) {
				return;
			}

			clearInterval(id);

			BX24 = window.BX24;
			resolve(BX24);
		}, 200)
	})
}

export {
	BX24,
	getBX24,
}
