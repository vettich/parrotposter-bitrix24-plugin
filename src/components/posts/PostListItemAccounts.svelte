<script lang="ts">
	import { accounts as accountsStore } from '../../store';
	import type { PostResults, PostResult, Account } from '../../types';

	import { AccountPhoto } from '../accounts';

	export let accountIds: string[] = [];
	export let results: PostResults;

	const getPostResult = (id: string): PostResult => {
		return results[id]
	}

	$: accounts = accountIds
		.map(id => $accountsStore.data.getById(id))
		.filter(account => !!account)

	$: resultsWithoutAccounts = Object.keys(results)
		.filter(id => !$accountsStore.data.getById(id))
		.map(id => ({ ...results[id], id }))
</script>

<div class="list">
	{#each accounts as account (account.id)}
		<AccountPhoto {account} result={getPostResult(account.id)} />
	{/each}

	{#each resultsWithoutAccounts as result (result.id)}
		<AccountPhoto result={result} />
	{/each}
</div>

<style lang="scss">
	.list {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
		min-height: 36px;
	}
</style>
