import { register, init, getLocaleFromNavigator, _, locale, locales } from 'svelte-i18n';
import { getCookie, setCookie } from 'typescript-cookie';

register('en', () => import('@src/assets/langs/en.json'));
register('ru', () => import('@src/assets/langs/ru.json'));

const langFromCookie = getCookie('pplang');

locale.subscribe(value => setCookie('pplang', value, { expires: 365 }))

init({
	fallbackLocale: 'en',
	initialLocale: langFromCookie || getLocaleFromNavigator(),
});

export {
	_,
	getLocaleFromNavigator,
	locale,
	locales,
}
