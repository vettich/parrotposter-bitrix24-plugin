<script lang="ts">
	import { user } from '@src/store';

	import { Icon } from '@smui/common';
	import List, { Item, Text, Graphic } from '@smui/list';
	import Menu from '@smui/menu';
	import type { MenuComponentDev } from '@smui/menu';
	import { Anchor } from '@smui/menu-surface';

	let menu: MenuComponentDev;

	// для отображения раскрывающегося списка ниже меню, а не над ним
	let anchor: HTMLDivElement;
	let anchorClasses: { [k: string]: boolean } = {};
	let useAnchorParams = {
		addClass: (className: string) => {
			if (!anchorClasses[className]) {
				anchorClasses[className] = true;
			}
		},
		removeClass: (className: string) => {
			if (anchorClasses[className]) {
				delete anchorClasses[className];
				anchorClasses = anchorClasses;
			}
		},
	}

	const formatUsername = (): string => {
		if (!$user.data.name) {
			return $user.data.username
		}
		return `${$user.data.name} (${$user.data.username})`
	}
</script>

<div class="menu {Object.keys(anchorClasses).join(' ')}"
	bind:this={anchor}
	use:Anchor={useAnchorParams}
	on:click|stopPropagation={() => {}}>

	<div class="menu__btn" on:click={() => menu.setOpen(true)}>
		{formatUsername()}
		<Icon class="material-icons">account_circle</Icon>
	</div>

	<Menu bind:this={menu} anchor={false} bind:anchorElement={anchor} anchorCorner="BOTTOM_LEFT">
		<List dense>
			<Item on:click={user.logout}>
				<Graphic class="material-icons-outlined">logout</Graphic>
				<Text>Выйти</Text>
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
