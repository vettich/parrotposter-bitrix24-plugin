const textareaResizer = (node: HTMLElement) => {
	const textareaElem = node.querySelector('textarea');
	if (!textareaElem) return;

	const autosizeTextarea = () => {
		textareaElem.style.height = '5px';
		textareaElem.style.height = textareaElem.scrollHeight + 'px';
	}

	textareaElem.addEventListener('input', autosizeTextarea);

	return {
		destroy() {
			textareaElem.removeEventListener('input', autosizeTextarea)
		}
	}
}



export {
	textareaResizer,
}
