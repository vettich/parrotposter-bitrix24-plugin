<svelte:head>
	<title>Аккаунты соц. сетей - ParrotPoster</title>
</svelte:head>

<script>
	import Layout from '@src/components/Layout.svelte';
	import AccountsAddButtons from '@src/components/accounts/AccountsAddButtons.svelte';
	import AccountsList from '@src/components/accounts/AccountsList.svelte';
</script>

<Layout>
	<h1>Аккаунты соц. сетей</h1>

	<AccountsAddButtons />
	<br>
	<AccountsList />
</Layout>

