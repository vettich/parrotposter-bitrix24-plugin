import { platform } from '@src/lib/platform';
import { writable } from 'svelte/store';

type ThemeVariant = 'light' | 'dark';

const storeKey = 'theme';

const getBrowserTheme = (): ThemeVariant => {
	const isDark = window?.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
	return isDark ? 'dark' : 'light';
}

const initial: ThemeVariant = getBrowserTheme();
const theme = writable<ThemeVariant>(initial, function start(set) {
	platform.store().get(storeKey).then(value => {
		if (value) set(value as ThemeVariant);
	})
});

const saveToStore = (value: ThemeVariant) => platform.store().set(storeKey, value);

let unsubscribe = theme.subscribe(saveToStore);

window?.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', async (event) => {
	const isset = await platform.store().get(storeKey);
	if (isset) return;

	unsubscribe();
	theme.set(event.matches ? 'dark' : 'light');
	unsubscribe = theme.subscribe(saveToStore);
})

export {
	type ThemeVariant,
	theme,
}
