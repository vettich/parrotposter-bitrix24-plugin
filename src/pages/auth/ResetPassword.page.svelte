<svelte:head>
	<title>ParrotPoster</title>
</svelte:head>

<script lang="ts">
	import { Link, useNavigate } from 'svelte-navigator';
	import { user } from '@src/store';
	import type { FieldError } from '@src/types';
	import { _ } from '@src/lib/i18n';

	import Textfield from '@smui/textfield';
	import Button from '@smui/button';
	import Icon from '@smui/textfield/icon';
	import CircularProgress from '@smui/circular-progress';
	import Paper, { Content } from '@smui/paper';
	import AuthLayout from '@src/components/AuthLayout.svelte';

	export let token = '';

	let password = '';
	let confirmPassword = '';

	let errors: FieldError[] = [];

	function verify(password: string, confirmPassword: string) {
		errors = [];

		const correctLength = password.length === 0 || password.length >= 6;
		if (!correctLength) {
			errors = [...errors, { msg: $_('auth.errors.password_length'), field: 'password' }]
		}

		if (password.length && correctLength && password !== confirmPassword) {
			errors = [...errors, { msg: $_('auth.errors.passwords_dont_match'), field: 'confirmPassword' }]
		}
	}
	$: verify(password, confirmPassword);

	const navigate = useNavigate();

	async function sendResetPasswordLink() {
		verify(password, confirmPassword);
		if (errors.length) return;

		const err = await user.resetPassword(password, token)
		if (err) errors = [err]
		else navigate('/reset-password-success')
	}
</script>

<AuthLayout on:submit={() => sendResetPasswordLink()}>
	<h1>{$_('auth.reset.page_title')}</h1>

	<Paper>{$_('auth.reset.reset_password_hint')}</Paper>

	<Textfield bind:value={password}
		variant="outlined"
		label={$_('auth.password')}
		type="password"
		invalid={!!errors.find(e => e.field === 'password')}>
		<Icon class="material-icons-outlined" slot="leadingIcon">lock</Icon>
	</Textfield>

	<Textfield bind:value={confirmPassword}
		variant="outlined"
		label={$_('auth.repeat_password')}
		type="password"
		invalid={!!errors.find(e => e.field === 'confirmPassword')}>
		<Icon class="material-icons-outlined" slot="leadingIcon">lock</Icon>
	</Textfield>

	<Button variant="raised" disabled={$user.loading}>
		{#if $user.loading}
			<CircularProgress indeterminate style="height: 24px; width: 24px;" />
		{:else}
			{$_('auth.reset.submit_btn')}
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
