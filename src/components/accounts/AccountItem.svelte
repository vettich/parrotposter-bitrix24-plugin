<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Account } from '@src/types';

	import AccountPhoto from './AccountPhoto.svelte';
	import AccountItemMenu from './AccountItemMenu.svelte';
	import Icon from '@src/components/common/Icon.svelte';

	export let account: Account;

	const dispatch = createEventDispatcher();
</script>

<div class="account-item mdc-elevation--z4">
	<AccountPhoto {account} size="big" />
	<span class="account-item__name text-ellipse--3">
		{account.name}
		<a href={account.link} target="_blank"><Icon>open_in_new</Icon></a>
	</span>
	<AccountItemMenu on:delete={() => dispatch('delete', account)} />
</div>

<style lang="scss">
	@use './src/theme/helpers' as *;

	.account-item {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5em;
		width: 250px;
		padding: 2em;
		border-radius: 4px;
		background-color: cssvar(surface);

		&:hover {
			@include cssvar(menu-icon-show, 1, pp-account-item);
		}

		@media screen and (max-width: 768px) {
			width: 100%;
		}

		&__name {
			text-align: center;
		}
	}
</style>
