import moment from 'moment';
import { register, init, getLocaleFromNavigator, _, locale, locales, waitLocale, date, getDateFormatter } from 'svelte-i18n';
import { derived, get, writable } from 'svelte/store';
import { getDateRange } from '@src/tools/date';
import { platform } from '../platform';

register('en', () => import('@src/assets/langs/en.json'));
register('ru', () => import('@src/assets/langs/ru.json'));

const storeKey = 'lang';

const langFromStore = await platform.store().get(storeKey);

locale.subscribe(value => platform.store().set(storeKey, value))

init({
	fallbackLocale: 'en',
	initialLocale: langFromStore || getLocaleFromNavigator(),
});

const isLoaded = writable<boolean>(false);
waitLocale().finally(() => isLoaded.set(true))

function _formatComingDays(date: Date | string): string {
	const dateRange = getDateRange(date);
	if (dateRange === 'today') return get(_)('date.today');
	if (dateRange === 'tomorrow') return get(_)('date.tomorrow');
	if (dateRange === 'yesterday') return get(_)('date.yesterday');

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
