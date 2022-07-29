import App from './App.svelte';

// fix scroll back up when navigate
history.pushState = new Proxy(history.pushState, {
	apply (target, thisArg, argumentsList) {
		Reflect.apply(target, thisArg, argumentsList);
		scrollTo(0,0);
	}
});

const app = new App({
	target: document.getElementById('app'),
	// hydrate: true,
});

export default app;
