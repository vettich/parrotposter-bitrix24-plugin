<script lang="ts">
	import { accounts } from '@src/store';
	import { AccountPhoto } from '@src/components/accounts';
	import type { Account } from '@src/types';
	import { _ } from '@src/lib/i18n';

	import CircularProgress from '@smui/circular-progress';

	export let accountIds: string[] = [];
	export let editable = true;

	function isSelected(account: Account, ids: string[]): boolean {
		return !!ids.find(id => account.id === id)
	}

	function switchSelect(account: Account) {
		if (!editable) return;
		const foundId = accountIds.find(id => account.id === id)
		if (foundId) accountIds = accountIds.filter(id => account.id !== id)
		else accountIds = [...accountIds, account.id]
	}
</script>

<div class="accounts-choose" class:accounts-choose--editable={editable}>
	<div class="accounts-choose__title">{$_('posts.form.where_publish')}</div>

	{#if $accounts.loading}
		<CircularProgress style="height: 32px; width: 32px" indeterminate />
	{:else}
		<div class="accounts-choose__items">
			{#each $accounts.data.getList() as account}
				<div class="accounts-choose__item" class:accounts-choose__item--selected={isSelected(account, accountIds)}
					on:click={() => switchSelect(account)}>
					<div class="accounts-choose__photo">
						<AccountPhoto {account} />
					</div>
					<div class="accounts-choose__account-name text-ellipse--2">{account.name}</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	@use './src/theme/helpers' as *;

	.accounts-choose {
		display: flex;
		flex-direction: column;
		gap: 10px;
		$parent: &;

		&__title {
			color: cssvar(secondary);
		}

		&__items {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 1em;

			@media screen and (max-width: 380px) {
				display: flex;
				flex-direction: column;
				gap: 0.5em;
			}
		}

		&__item {
			position: relative;
			display: flex;
			align-items: center;
			gap: 12px;
			padding: 12px;
			border-radius: 4px;
			opacity: 0.7;
			border: 1px solid rgba(cssvar(secondary-rgb), 0.25);
			transition: all 0.2s ease;

			@media screen and (max-width: 768px) {
				flex-direction: column;
			}

			&--selected {
				border-color: rgba(cssvar(primary-rgb), 0.5);
				background-color: rgba(cssvar(primary-rgb), 0.15);
			}

			#{$parent}--editable & {
				opacity: 1;
				cursor: pointer;

				&:hover {
					border-color: rgba(cssvar(secondary-rgb), 0.6);
				}

				&--selected:hover {
						border-color: rgba(cssvar(primary-rgb), 0.6);
				}
			}
		}

		&__photo {
			flex-shrink: 0;
		}

		&__account-name {
			flex-grow: 1;
			font-size: 14px;
			color: cssvar(secondary);

			@media screen and (max-width: 768px) {
				text-align: center;
			}
		}
	}
</style>
