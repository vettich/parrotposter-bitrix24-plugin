<script lang="ts">
	import { accounts } from '@src/store';
	import { AccountPhoto } from '@src/components/accounts';
	import type { Account } from '@src/types';

	export let accountIds: string[] = [];

	function isSelected(account: Account, ids: string[]): boolean {
		return !!ids.find(id => account.id === id)
	}

	function switchSelect(account: Account) {
		const foundId = accountIds.find(id => account.id === id)
		if (foundId) accountIds = accountIds.filter(id => account.id !== id)
		else accountIds = [...accountIds, account.id]
	}
</script>

<div class="accounts-choose">
	<div class="accounts-choose__title">Куда публиковать</div>
	
	<div class="accounts-choose__items">
		{#each $accounts.data.getList() as account}
			<div class="accounts-choose__item" class:accounts-choose__item--selected={isSelected(account, accountIds)}
				on:click={() => switchSelect(account)}>
				<div class="accounts-choose__photo">
					<AccountPhoto {account} />
				</div>
				<div class="accounts-choose__account-name">{account.name}</div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	@use './src/theme/helpers' as *;

	.accounts-choose {
		display: flex;
		flex-direction: column;
		gap: 10px;

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
			border: 1px solid rgba(0, 0, 0, 0.2);
			border-radius: 4px;
			cursor: pointer;

			@media screen and (max-width: 768px) {
				flex-direction: column;
			}

			&:before, &:after {
				content: "";
				position: absolute;
				left: -1px;
				right: -1px;
				top: -1px;
				bottom: -1px;
				border-radius: 4px;
				transition: all 0.2s ease;
				opacity: 0;
				z-index: 0;
			}

			&:hover {
				box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
			}

			&--selected {
				&:before {
					background-color: cssvar(primary);
					opacity: 0.15;
				}

				&:after {
					border: 1px solid cssvar(primary);
					opacity: 0.4;
				}
			}
		}

		&__photo {
			flex-shrink: 0;
		}

		&__account-name {
			flex-grow: 1;
			display: -webkit-box;
			height: fit-content;
			font-size: 14px;
			line-height: 1.1;
			overflow: hidden;
			text-overflow: ellipsis;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			-moz-line-clamp: 2;
			-moz-box-orient: vertical;
			color: cssvar(secondary);

			@media screen and (max-width: 768px) {
				text-align: center;
			}
		}
	}
</style>
