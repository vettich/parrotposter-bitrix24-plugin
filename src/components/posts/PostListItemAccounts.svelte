<script lang="ts">
	import { accounts } from '@src/store';
	import { mergeAccountsResults } from '@src/tools';
	import type { PostResults } from '@src/types';

	import { AccountPhoto } from '@src/components/accounts';

	export let accountIds: string[] = [];
	export let results: PostResults;

	$: items = mergeAccountsResults($accounts.data, accountIds, results);
</script>

<div class="list">
	{#each items as item (item.id)}
		<AccountPhoto id={item.id} account={item.account} success={item.result?.success} />
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
