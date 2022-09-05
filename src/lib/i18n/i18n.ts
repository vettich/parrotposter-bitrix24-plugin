import { register, init, getLocaleFromNavigator, _, locale, locales, waitLocale } from 'svelte-i18n';
import {writable} from 'svelte/store';
import { getCookie, setCookie } from 'typescript-cookie';

register('en', () => import('@src/assets/langs/en.json'));
register('ru', () => import('@src/assets/langs/ru.json'));

const langFromCookie = getCookie('pplang');

locale.subscribe(value => setCookie('pplang', value, { expires: 365 }))

init({
	fallbackLocale: 'en',
	initialLocale: langFromCookie || getLocaleFromNavigator(),
});

const isLoaded = writable<boolean>(false);
waitLocale().finally(() => isLoaded.set(true))

export {
	_,
	getLocaleFromNavigator,
	locale,
	locales,
	isLoaded,
}
