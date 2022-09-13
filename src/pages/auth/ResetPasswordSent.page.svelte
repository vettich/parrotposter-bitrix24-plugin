<svelte:head>
	<title>ParrotPoster</title>
</svelte:head>

<script lang="ts">
	import { Link } from 'svelte-navigator';
	import { _ } from '@src/lib/i18n';

	import Paper, { Content } from '@smui/paper';
	import AuthLayout from '@src/components/AuthLayout.svelte';
</script>

<AuthLayout>
	<h1>{$_('auth.forgot.page_title')}</h1>

	<Paper>
		<Content>
			{$_('auth.forgot.reset_password_sent')}
		</Content>
	</Paper>

	<div><Link to="/login">{$_('auth.login_link')}</Link></div>
</AuthLayout>
