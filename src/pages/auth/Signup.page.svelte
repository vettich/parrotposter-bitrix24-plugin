<svelte:head>
	<title>ParrotPoster</title>
</svelte:head>

<script lang="ts">
	import { Link } from 'svelte-navigator';
	import { user } from '@src/store';
	import type { FieldError } from '@src/types';
	import { _ } from '@src/lib/i18n';

	import Textfield from '@smui/textfield';
	import Button from '@smui/button';
	import Icon from '@smui/textfield/icon';
	import CircularProgress from '@smui/circular-progress';
	import Paper, { Content } from '@smui/paper';
	import AuthLayout from '@src/components/AuthLayout.svelte';

	let name = '';
	let username = '';
	let password = '';

	let errors: FieldError[] = [];

	function verify(maybeEmpty: boolean, username: string, password: string) {
		errors = [];

		if (!maybeEmpty) {
			if (!username.length && !password.length) {
				errors = [...errors, { msg : $_('auth.errors.login_password_empty'), field: 'username' }, { field: 'password' }]
			} else if (!username.length) {
				errors = [...errors, { msg : $_('auth.errors.login_empty'), field: 'username' }]
			} else if (!password.length) {
				errors = [...errors, { msg : $_('auth.errors.password_empty'), field: 'password' }]
			}
		}
	}
	$: verify(true, username, password);

	async function onLogin() {
		verify(false, username, password);
		if (errors.length) return;

		const err = await user.signup(name, username, password)
		if (err) errors = [err]
	}
</script>

<AuthLayout on:submit={() => onLogin()}>
	<h1>{$_('auth.signup.page_title')}</h1>

	<Textfield bind:value={name}
		variant="outlined"
		label={$_('auth.name')}
		invalid={!!errors.find(e => e.field === 'name')}
		autofocus>
		<Icon class="material-icons-outlined" slot="leadingIcon">badge</Icon>
	</Textfield>

	<Textfield bind:value={username}
		variant="outlined"
		label={$_('auth.email')}
		invalid={!!errors.find(e => e.field === 'username')}
		autofocus>
		<Icon class="material-icons-outlined" slot="leadingIcon">email</Icon>
	</Textfield>

	<Textfield bind:value={password}
		variant="outlined"
		label={$_('auth.password')}
		type="password"
		invalid={!!errors.find(e => e.field === 'password')}>
		<Icon class="material-icons-outlined" slot="leadingIcon">lock</Icon>
	</Textfield>

	<Button variant="raised" disabled={$user.loading}>
		{#if $user.loading}
			<CircularProgress indeterminate style="height: 24px; width: 24px;" />
		{:else}
			{$_('auth.signup.submit_btn')}
		{/if}
	</Button>

	{#if errors.length}
		<Paper color="error">
			<Content>
				{#each errors as err}
					{#if err.msg}
						{err.msg}<br>
					{/if}
				{/each}
			</Content>
		</Paper>
	{/if}

	<div><Link to="/login">{$_('auth.login_link')}</Link></div>
</AuthLayout>
