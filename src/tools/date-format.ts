// return time to format HH:MM
function formatToTime(date: string | Date): string {
	date = new Date(date);
	const hh = addZero(date.getHours());
	const mm = addZero(date.getMinutes());
	return `${hh}:${mm}`;
}

function addZero(n: number): string {
	return n < 10 ? `0${n}` : `${n}`;
}

export {
	formatToTime,
}
