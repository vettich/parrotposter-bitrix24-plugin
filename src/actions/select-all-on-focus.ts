const selectAllOnFocus = (node: HTMLElement) => {
	const inputElem: HTMLInputElement | HTMLTextAreaElement = node.querySelector('textarea,input');
	if (!inputElem) return;

	inputElem.addEventListener('focus', () => {
		const txt = inputElem.value;
		inputElem.setSelectionRange(0, txt.length)
	})
}

export {
	selectAllOnFocus,
}
