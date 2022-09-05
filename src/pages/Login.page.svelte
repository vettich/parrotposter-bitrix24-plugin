<svelte:head>
	<title>ParrotPoster</title>
</svelte:head>

<script>
	import { onDestroy } from 'svelte';
	import { user } from '@src/store';
	import { _ } from '@src/lib/i18n';

	import Textfield from '@smui/textfield';
	import Button from '@smui/button';
	import Icon from '@smui/textfield/icon';
	import CircularProgress from '@smui/circular-progress';
	import Paper, { Content } from '@smui/paper';
	import ThemeSwitcher from '@src/components/ThemeSwitcher.svelte';
	import LanguageSwitcher from '@src/components/LanguageSwitcher.svelte';

	let username = '';
	let password = '';

	let errors = [];
	let errorMsg = null;

	$: {
		errors = (username && password && []) || [];
		errorMsg = null;
	}

	const unsubscribe = user.subscribe($user => {
		errors = $user.error?.fields || [];
		errorMsg = $user.error?.msg;
		if (errorMsg === 'login_password_empty') {
			errorMsg = $_('auth.login_password_empty');
		}
	})

	onDestroy(unsubscribe);

	function onLogin() {
		user.login(username, password)
	}
</script>

<div class="login-form mdc-elevation--z4">
	<div class="login-form__switchers">
		<LanguageSwitcher />
		<ThemeSwitcher />
	</div>

	<form class="login-form__container" on:submit|preventDefault={onLogin}>
		<h1>{$_('auth.login_page_title')}</h1>

		<Textfield bind:value={username}
			variant="outlined"
			label={$_('auth.email')}
			invalid={!!errors.includes('username')}
			autofocus>
			<Icon class="material-icons-outlined" slot="leadingIcon">email</Icon>
		</Textfield>

		<Textfield bind:value={password}
			variant="outlined"
			label={$_('auth.password')}
			type="password"
			invalid={!!errors.includes('password')}>
			<Icon class="material-icons-outlined" slot="leadingIcon">lock</Icon>
		</Textfield>

		<Button variant="raised" disabled={$user.loading}>
			{#if $user.loading}
				<CircularProgress indeterminate style="height: 24px; width: 24px;" />
			{:else}
				{$_('auth.login_btn')}
			{/if}
		</Button>

		{#if errorMsg}
			<Paper color="error">
				<Content>{errorMsg}</Content>
			</Paper>
		{/if}

		<div>
			<a href="https://parrotposter.com/app/#/forgot" target="_blank">
				{$_('auth.forgot_password')}
				<Icon class="material-icons-outlined">open_in_new</Icon>
			</a>
		</div>

		<div>
			<a href="https://parrotposter.com/app/#/signup" target="_blank">
				{$_('auth.registration')}
				<Icon class="material-icons-outlined">open_in_new</Icon>
			</a>
		</div>
	</form>
</div>

<style lang="scss">
	@use './src/theme/helpers' as *;

	.login-form {
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
