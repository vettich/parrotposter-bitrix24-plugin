function addLeadingZero(n: number, less: number = 10): string {
	return n < less ? `0${n}` : `${n}`;
}

export {
	addLeadingZero,
}
