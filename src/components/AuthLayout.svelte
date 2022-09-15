<script context="module">
	let _username = '';

	export function getUsername() {
		return _username;
	}
</script>

<script>
	import { createEventDispatcher } from 'svelte';
	import { _ } from '@src/lib/i18n';

	import ThemeSwitcher from '@src/components/ThemeSwitcher.svelte';
	import LanguageSwitcher from '@src/components/LanguageSwitcher.svelte';

	const dispatch = createEventDispatcher();

	export let username = _username;
	$: {
		_username = username;
	}
</script>

<div class="auth-layout mdc-elevation--z4">
	<div class="auth-layout__switchers">
		<LanguageSwitcher />
		<ThemeSwitcher />
	</div>

	<form class="auth-layout__container" on:submit|preventDefault={() => dispatch('submit')}>
		<slot />
	</form>
</div>

<style lang="scss">
	@use './src/theme/helpers' as *;

	.auth-layout {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 18px;
		max-width: 100%;
		width: 550px;
		padding: 2em;
		padding-bottom: 3em;
		margin: 2em auto 0;
		background-color: cssvar(surface);

		@media screen and (max-width: 768px) {
			padding: 0;
			margin: 0 auto;
			background-color: transparent;
			box-shadow: none;
		}

		&__container {
			display: flex;
			flex-direction: column;
			gap: 18px;
			width: 300px;
			max-width: 100%;
		}

		&__switchers {
			position: absolute;
			left: 100%;
			top: 0;

			@media screen and (max-width: 768px) {
				position: relative;
				left: auto;
				top: auto;
				display: flex;
				align-self: flex-end;
			}
		}
	}
</style>
