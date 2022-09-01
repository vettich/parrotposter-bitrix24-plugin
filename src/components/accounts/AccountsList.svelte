<script lang="ts">
	import { accounts } from '@src/store';
	import type { Account } from '@src/types';

	import AccountItem from './AccountItem.svelte';
	import AccountDelete from './AccountDelete.svelte';
	import CircularProgress from '@smui/circular-progress';

	let accountToDelete: Account;
	let openDeleteDialog = false;

	const onDelete = (e: CustomEvent<Account>) => {
		accountToDelete = e.detail;
		openDeleteDialog = true;
	}

</script>

{#if $accounts.loading}
	<CircularProgress style="height: 32px; width: 32px" indeterminate />
{:else}
	<div class="accounts-list">
		{#each $accounts.data.getList() as account (account.id)}
			<AccountItem {account} on:delete={onDelete} />
		{/each}
	</div>
{/if}

<AccountDelete account={accountToDelete} bind:open={openDeleteDialog} />

<style lang="scss">
	.accounts-list {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;

		@media screen and (max-width: 768px) {
			display: grid;
			grid-template-columns: 1fr 1fr;
		}

		@media screen and (max-width: 520px) {
			display: grid;
			grid-template-columns: 1fr;
		}
	}
</style>
