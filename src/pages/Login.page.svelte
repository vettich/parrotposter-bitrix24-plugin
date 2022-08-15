<script>
	import { onDestroy } from 'svelte';
	import Textfield from '@smui/textfield';
	import Button from '@smui/button';
	import Icon from '@smui/textfield/icon';
	import CircularProgress from '@smui/circular-progress';
	import Paper, { Content } from '@smui/paper';
	import { user } from '../store';

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
	})

	onDestroy(unsubscribe);

	function onLogin() {
		user.login(username, password)
	}
	
</script>

<form on:submit|preventDefault={onLogin}>
	<h1>Авторизация</h1>

	<Textfield bind:value={username}
		variant="outlined"
		label="Email"
		invalid={!!errors.includes('username')}>
		<Icon class="material-icons-outlined" slot="leadingIcon">email</Icon>
	</Textfield>

	<Textfield bind:value={password}
		variant="outlined"
		label="Пароль"
		type="password"
		invalid={!!errors.includes('password')}>
		<Icon class="material-icons-outlined" slot="leadingIcon">lock</Icon>
	</Textfield>

	<Button variant="raised" disabled={$user.loading}>
		{#if $user.loading}
			<CircularProgress indeterminate style="height: 24px; width: 24px;" />
		{:else}
			Войти
		{/if}
	</Button>

	{#if errorMsg}
		<Paper color="error">
			<Content>{errorMsg}</Content>
		</Paper>
	{/if}

	<div>
		<a href="https://parrotposter.com/app/#/forgot" target="_blank">
			Забыли пароль?
			<Icon class="material-icons-outlined">open_in_new</Icon>
		</a>
	</div>

	<div>
		<a href="https://parrotposter.com/app/#/signup" target="_blank">
			Зарегистрироваться
			<Icon class="material-icons-outlined">open_in_new</Icon>
		</a>
	</div>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 18px;
		max-width: 100%;
		width: 300px;
		padding: 1em;
		margin: 0 auto;
	}
</style>
