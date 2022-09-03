import './global.scss';
import App from './App.svelte';
import { BX24 } from './lib/bx24';

// import and set moment locale
import 'moment/dist/locale/ru.js';
import moment from 'moment';
moment.locale('ru');

// fix scroll back up when navigate
history.pushState = new Proxy(history.pushState, {
	apply (target, thisArg, argumentsList) {
		Reflect.apply(target, thisArg, argumentsList);
		scrollTo(0,0);
	}
});

// observe document.title and change title in BX24 app
new MutationObserver(() => {
	BX24?.setTitle(document.title);
}).observe(
	document.querySelector('title'),
	{ subtree: true, characterData: true, childList: true },
)

const app = new App({
	target: document.getElementById('app'),
	// hydrate: true,
});

export default app;
