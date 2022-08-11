<script lang="ts">
	import { accounts as accountsStore } from '../../store';
	import type { PostResults } from '../../types';

	export let accountIds: string[] = [];
	export let results: PostResults;

	$: accounts = accountIds
		.map(id => $accountsStore.data.getById(id))
		.filter(account => !!account)

	const placeholderSrc = '/images/placeholder.png';

	function onError() {
		this.src = placeholderSrc
	}
</script>

<div class="list">
	{#each accounts as account (account.id)}
		<div class="item">
			<img src={account.photo} on:error={onError} alt="">
		</div>
	{/each}
</div>

<style lang="scss">
	.list {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}

	.item {
		border: none;
		border-radius: 50%;
		width: 36px;
		height: 36px;
		overflow: hidden;

		img {
			width: 100%;
			height: 100%;
			background: url(/images/placeholder.png) center / cover;
			object-fit: cover;
			object-position: center;
		}
	}
</style>
