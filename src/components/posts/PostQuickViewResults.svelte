<script lang="ts">
	import type { Post, PostResult } from '@src/types';
	import { accounts } from '@src/store';
	import { mergeAccountsResults } from '@src/tools';
	import { _ } from '@src/lib/i18n';

	import AccountPhoto from "@src/components/accounts/AccountPhoto.svelte";
	import { Icon } from '@smui/common';

	export let post: Post;

	$: items = mergeAccountsResults($accounts.data, post.networks.accounts, post.results)

	const formatResult = (result: PostResult): string => {
		if (!result) return 'Пост еще не был опубликован в эту соц. сеть';
		if (result.success) return 'Успешно';
		return result.error_formatted || result.error_msg || 'Ошибка публикации';
	}

	const formatStatus = (result: PostResult): 'no' | 'success' | 'fail' => {
		if (!result) return 'no';
		return result.success ? 'success' : 'fail';
	}
</script>

<div class="post-quick-view-results">
	{#each Object.values(items) as item}
		<div class="post-quick-view-results__item">
			<div class="post-quick-view-results__photo">
				<AccountPhoto id={item.id} account={item.account} />
			</div>
			<div class="post-quick-view-results__detail">
				<div class="post-quick-view-results__account-name">
					{#if item.account}
						{item.account.name}
					{:else}
						{$_('posts.account_was_deleted')}
					{/if}
				</div>
				<div class="post-quick-view-results__status post-quick-view-results__status--{formatStatus(item.result)}">
					{#if item.result?.success}
						<a href={item.result.link} target="_blank" title={$_('actions.open_in_new_tab')}>
							{$_('posts.view_post')}
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
	@use './src/theme/helpers' as *; 

	.post-quick-view-results {
		display: grid;
		grid-template-columns: 50% 1fr;
		gap: 10px 4px;
		margin-top: 4px;

		@media screen and (max-width: 768px) {
			display: flex;
			flex-direction: column;
			gap: 18px;
		}

		&__item {
			display: flex;
			justify-content: left;
			align-items: flex-start;
			gap: 8px;
			font-size: 14px;
		}

		&__detail {
			display: flex;
			flex-direction: column;
			justify-content: left;
			align-items: space-between;
			gap: 6px;
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
