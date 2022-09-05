import moment from 'moment';
import { register, init, getLocaleFromNavigator, _, locale, locales, waitLocale, date, getDateFormatter } from 'svelte-i18n';
import { derived, get, writable } from 'svelte/store';
import { getCookie, setCookie } from 'typescript-cookie';

register('en', () => import('@src/assets/langs/en.json'));
register('ru', () => import('@src/assets/langs/ru.json'));

const langFromCookie = getCookie('pplang');

locale.subscribe(value => setCookie('pplang', value, { expires: 365, path: '/' }))

init({
	fallbackLocale: 'en',
	initialLocale: langFromCookie || getLocaleFromNavigator(),
});

const isLoaded = writable<boolean>(false);
waitLocale().finally(() => isLoaded.set(true))

function _formatComingDays(date: Date | string): string {
	date = new Date(date);
	const now = new Date();

	const isCurrentYear = now.getFullYear() === date.getFullYear();
	const isCurrentMonth = isCurrentYear && now.getMonth() === date.getMonth();
	if (isCurrentMonth) {
		const nowDay = now.getDate();
		const day = date.getDate();
		if (nowDay === day) return get(_)('date.today');
		if (nowDay + 1 === day) return get(_)('date.tomorrow');
		if (nowDay - 1 === day) return get(_)('date.yesterday');
	}

	return moment(date).fromNow();
}

function _formatDateWithDuration(date: Date | string): string {
	let result = getDateFormatter().format(new Date(date));
	result += ', ' + _formatComingDays(date);
	return result
}

const formatDateWithDuration = derived([locale], () => _formatDateWithDuration)

export {
	_,
	getLocaleFromNavigator,
	locale,
	locales,
	isLoaded,
	date,
	formatDateWithDuration,
}
