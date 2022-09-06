type DateRange = 'future' | 'past' | 'today' | 'yesterday' | 'tomorrow';

function getDateRange(date: Date | string): DateRange {
	date = new Date(date);
	const now = new Date();

	const year = date.getFullYear();
	const nowYear = now.getFullYear();
	if (year > nowYear) return 'future';
	if (year < nowYear) return 'past';

	const month = date.getMonth();
	const nowMonth = now.getMonth();
	if (month > nowMonth) return 'future';
	if (month < nowMonth) return 'past';

	const day = date.getDate();
	const nowDay = now.getDate();
	if (day === nowDay) return 'today';
	if (day === nowDay + 1) return 'tomorrow';
	if (day === nowDay - 1) return 'yesterday';
	if (day > nowDay) return 'future';
	if (day < nowDay) return 'past';
}

export {
	getDateRange,
}
