<script lang="ts">
	import { user } from '@src/store';
	import { _ } from '@src/lib/i18n';

	import { Icon } from '@smui/common';
	import List, { Item, Text, Graphic } from '@smui/list';
	import Menu from '@smui/menu';

	let menuOpen = false;

	const formatUsername = (): string => {
		if (!$user.data.name) {
			return $user.data.username
		}
		return `${$user.data.name} (${$user.data.username})`
	}
</script>

<svelte:body on:click|capture={() => menuOpen = false} />

<div class="menu">
	<div class="menu__btn" on:click={() => menuOpen = true}>
		{formatUsername()}
		<Icon class="material-icons">account_circle</Icon>
	</div>

	<Menu bind:open={menuOpen} managed={true} anchorCorner="BOTTOM_LEFT">
		<List dense>
			<Item on:click={user.logout}>
				<Graphic class="material-icons-outlined">logout</Graphic>
				<Text>{$_('menu.logout')}</Text>
			</Item>
		</List>
	</Menu>
</div>

<style lang="scss">
	@use './src/theme/helpers' as *; 

	.menu {
		height: 100%;

		&__btn {
			display: flex;
			align-items: center;
			gap: 6px;
			padding: 8px;
			border-radius: 0 4px 4px 0;
			height: 100%;
			transition: background-color 0.2s ease;
			cursor: pointer;

			:global(.material-icons) {
				font-size: 32px;
				color: cssvar(secondary);
			}

			&:hover {
				background-color: rgba(0, 0, 0, 0.06);
			}
		}
	}
</style>
