<script lang="ts">
	import type { Post, PostResult } from '../../types';
	import { accounts } from '../../store';
	import { mergeAccountsResults } from '../../tools';

	import AccountPhoto from "../accounts/AccountPhoto.svelte";
	import { Icon } from '@smui/common';

	export let post: Post;

	$: items = mergeAccountsResults($accounts.data, post.networks.accounts, post.results)

	const formatResult = (result: PostResult): string => {
		if (!result) return 'Пост еще не был опубликован в эту соц. сеть';
		if (result.success) return 'Успешно';
		return result.error_formatted || result.error_msg || 'Ошибка публикации';
	}

	const formatResultStatus = (result: PostResult): 'no' | 'success' | 'fail' => {
		if (!result) return 'no';
		return result.success ? 'success' : 'fail';
	}
</script>

<div class="results">
	{#each Object.values(items) as item}
		<div class="results__item">
			<div class="results__photo">
				<AccountPhoto id={item.id} account={item.account} />
			</div>
			<div class="results__detail">
				<div class="results__account-name">
					{#if item.account}
						{item.account.name}
					{:else}
						Аккаунт был удален
					{/if}
				</div>
				<div class="results__status results__status--{formatResultStatus(item.result)}">
					{#if item.result?.success}
						<a href={item.result.link} target="_blank" title="Откроется в новой вкладке">
							Посмотреть пост
							<Icon class="material-icons-outlined">open_in_new</Icon>
						</a>
					{:else}
						{formatResult(item.result)}
					{/if}
				</div>
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
	@use '../../theme/helpers' as *; 

	.results {
		display: grid;
		grid-template-columns: 50% 1fr;
		gap: 10px 4px;
		margin-top: 4px;

		@media screen and (max-width: 768px) {
			grid-template-columns: 100%;
		}

		&__item {
			display: flex;
			justify-content: left;
			align-items: flex-start;
			gap: 8px;
			font-size: 14px;
		}

		&__account-name {
			font-weight: bold;
			line-height: 1;
		}

		&__status {
			line-height: 1;

			&--success { color: cssvar(success) }
			&--fail { color: cssvar(error) }
		}
	}
</style>
