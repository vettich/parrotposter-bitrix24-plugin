import moment from 'moment';
import { register, init, getLocaleFromNavigator, _, locale, locales, waitLocale, date, getDateFormatter } from 'svelte-i18n';
import { derived, get, writable } from 'svelte/store';
import { getDateRange } from '@src/tools/date';
import { platform } from '../platform';

register('en', () => import('@src/assets/langs/en.json'));
register('ru', () => import('@src/assets/langs/ru.json'));

const storeKey = 'lang';

// watch changing locale and save changed value in store
locale.subscribe(value => platform.store().set(storeKey, value))

// set initial lang from store if exists
platform.store().get(storeKey).then(lang => {
	if (lang) locale.set(lang)
});

// initial svelte-i18n
init({
	fallbackLocale: 'en',
	initialLocale: getLocaleFromNavigator(),
});

// indicator for locale loaded
const isLoaded = writable<boolean>(false);
waitLocale().finally(() => isLoaded.set(true))

// return today, tomorrow or yesterday by current locale
function _formatComingDays(date: Date | string): string {
	const dateRange = getDateRange(date);
	if (dateRange === 'today') return get(_)('date.today');
	if (dateRange === 'tomorrow') return get(_)('date.tomorrow');
	if (dateRange === 'yesterday') return get(_)('date.yesterday');

	return moment(date).fromNow();
}

// format date and concat today, tomorrow or yesterday by current locale
function _formatDateWithDuration(date: Date | string): string {
	let result = getDateFormatter().format(new Date(date));
	result += ', ' + _formatComingDays(date);
	return result
}

// format date with current locale with append duration to date
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
