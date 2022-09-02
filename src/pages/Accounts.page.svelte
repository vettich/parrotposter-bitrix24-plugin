<svelte:head>
	<title>Аккаунты соц. сетей - ParrotPoster</title>
</svelte:head>

<script>
	import Layout from '@src/components/Layout.svelte';
	import AccountsAddButtons from '@src/components/accounts/AccountsAddButtons.svelte';
	import AccountsList from '@src/components/accounts/AccountsList.svelte';
	import AccountsLimitsInfo from '@src/components/accounts/AccountsLimitsInfo.svelte';
</script>

<Layout>
	<div class="accounts-page__header">
		<h1>Аккаунты соц. сетей</h1>
		<AccountsLimitsInfo />
	</div>

	<AccountsAddButtons />
	<br>
	<AccountsList />
</Layout>

<style lang="scss">
	.accounts-page {
		&__header {
			display: flex;
			align-items: center;
			gap: 16px;
			flex-wrap: wrap;
			margin: 22px auto;

			h1 {
				margin: 0;
			}
		}
	}
</style>
