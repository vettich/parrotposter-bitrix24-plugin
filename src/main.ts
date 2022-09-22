import './global.scss';
import App from './App.svelte';

// import and set moment locale
import 'moment/dist/locale/ru.js';
import moment from 'moment';

// set i18n
import { locale, init as initI18n } from '@src/lib/i18n';
initI18n();
locale.subscribe(value => moment.locale(value));

// close window if `close=true` in location
const sp = new URLSearchParams(location.search);
if (sp.get('close') === 'true') {
	window.close();
}

// fix scroll back up when navigate
history.pushState = new Proxy(history.pushState, {
	apply (target, thisArg, argumentsList) {
		Reflect.apply(target, thisArg, argumentsList);
		scrollTo(0,0);
	}
});

import { platform } from './lib/platform';
platform.init();

const app = new App({
	target: document.getElementById('app'),
	// hydrate: true,
});

export default app;
