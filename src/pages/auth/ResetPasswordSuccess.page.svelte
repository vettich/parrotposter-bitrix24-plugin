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
	<h1>{$_('auth.reset.page_title')}</h1>

	<Paper color="success">
		<Content>
			{$_('auth.reset.success')}
		</Content>
	</Paper>

	<div><Link to="/login">{$_('auth.login_link')}</Link></div>
</AuthLayout>
