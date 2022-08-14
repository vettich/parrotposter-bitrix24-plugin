<script lang="ts">
	import { Icon } from '@smui/common';
	import Menu from '@smui/menu';
	import List, { Item, Text } from '@smui/list';
	import IconButton from '@smui/icon-button';
	import type { MenuComponentDev } from '@smui/menu';

	let menu: MenuComponentDev;
</script>


<div class="menu">
	<div class="menu-icon">
		<IconButton class="material-icons-outlined" on:click={() => menu.setOpen(true)}>more_vert</IconButton>
	</div>
	<Menu bind:this={menu}>
		<List>
			<Item>
				<Text><Icon class="material-icons-outlined menu-item-icon">edit</Icon>Редактировать</Text>
			</Item>
			<Item>
				<Text><span class="menu-item--red"> 
					<Icon class="material-icons-outlined menu-item-icon">delete</Icon>
					Удалить
				</span></Text>
			</Item>
		</List>
	</Menu>
</div>

<style lang="scss">
	@use '../../theme/helpers' as *; 

	@include cssvars((menu-icon-show: 0), 'pp-post-list-item');

	.menu-icon {
		opacity: cssvar(menu-icon-show, 'pp-post-list-item');
		transition: opacity 0.2s ease;
	}

	.menu {
		:global(button) {
			margin: 0;
			width: 28px;
			height: 28px;
			font-size: 1.1em;
		}

		:global(.menu-item-icon) {
			vertical-align: middle;
			font-size: 1.2em;
			margin-right: 4px;
		}
	}

	.menu-item--red {
		color: cssvar(error);
	}
</style>
