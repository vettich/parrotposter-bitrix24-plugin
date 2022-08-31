import { writable } from 'svelte/store';
import { getCookie, setCookie } from 'typescript-cookie';

type ThemeVariant = 'light' | 'dark';

const cookieKey = 'pp-theme';

const getBrowserTheme = (): ThemeVariant => {
	const isDark = window?.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
	return isDark ? 'dark' : 'light';
}

const initial: ThemeVariant = getCookie(cookieKey) as ThemeVariant || getBrowserTheme();
const theme = writable<ThemeVariant>(initial);

const saveInCookie = (value: ThemeVariant) => setCookie(cookieKey, value, { expires: 365 });

let unsubscribe = theme.subscribe(saveInCookie);

window?.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
	const issetCookie = getCookie(cookieKey);
	if (issetCookie) return;

	unsubscribe();
	theme.set(event.matches ? 'dark' : 'light');
	unsubscribe = theme.subscribe(saveInCookie);
})

export {
	type ThemeVariant,
	theme,
}
