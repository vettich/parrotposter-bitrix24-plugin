<svelte:head>
	<title>ParrotPoster</title>
</svelte:head>

<script lang="ts">
	import { Link, useNavigate, useResolve } from 'svelte-navigator';
	import { user } from '@src/store';
	import type { FieldError } from '@src/types';
	import { _ } from '@src/lib/i18n';

	import Textfield from '@smui/textfield';
	import Button from '@smui/button';
	import Icon from '@smui/textfield/icon';
	import CircularProgress from '@smui/circular-progress';
	import Paper, { Content } from '@smui/paper';
	import AuthLayout from '@src/components/AuthLayout.svelte';

	let username = '';

	let errors: FieldError[] = [];

	function verify(maybeEmpty: boolean, username: string) {
		errors = [];

		if (!maybeEmpty) {
			if (!username.length) {
				errors = [...errors, { msg : $_('auth.errors.login_empty'), field: 'username' }]
			}
		}
	}
	$: verify(true, username);

	const resolve = useResolve();
	const navigate = useNavigate();

	async function sendResetPasswordLink() {
		verify(false, username);
		if (errors.length) return;

		const callbackUrl = location.origin + resolve('/reset-password') + '/{{token}}';
		const err = await user.forgotPassword(username, callbackUrl)
		if (err) errors = [err]
		else navigate('/reset-password-sent', { replace: true })
	}
</script>

<AuthLayout on:submit={() => sendResetPasswordLink()}>
	<h1>{$_('auth.forgot.page_title')}</h1>

	<Textfield bind:value={username}
		variant="outlined"
		label={$_('auth.email')}
		invalid={!!errors.find(e => e.field === 'username')}
		autofocus>
		<Icon class="material-icons-outlined" slot="leadingIcon">email</Icon>
	</Textfield>

	<Button variant="raised" disabled={$user.loading}>
		{#if $user.loading}
			<CircularProgress indeterminate style="height: 24px; width: 24px;" />
		{:else}
			{$_('auth.forgot.submit_btn')}
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
