<script lang="ts">
	import Menu from '@smui/menu';
	import List, { Item, Text, Graphic } from '@smui/list';
	import IconButton from '@smui/icon-button';
	import type { MenuComponentDev } from '@smui/menu';

	let menu: MenuComponentDev;
</script>


<div class="menu" on:click|stopPropagation={() => {}}>
	<div class="menu__icon">
		<IconButton class="material-icons-outlined" on:click={() => menu.setOpen(true)}>more_vert</IconButton>
	</div>

	<Menu bind:this={menu}>
		<List dense>
			<Item>
				<Graphic class="material-icons-outlined">edit</Graphic>
				<Text>Редактировать</Text>
			</Item>
			<Item>
				<Graphic class="material-icons-outlined menu--red">delete</Graphic>
				<Text class="menu--red">Удалить</Text>
			</Item>
		</List>
	</Menu>
</div>

<style lang="scss">
	@use './src/theme/helpers' as *; 

	@include cssvars((menu-icon-show: 0), 'pp-post-list-item');

	.menu {
		:global(button) {
			margin: 0;
			width: 28px;
			height: 28px;
			font-size: 1.1em;
		}

		&__icon {
			opacity: cssvar(menu-icon-show, 'pp-post-list-item');
			transition: opacity 0.2s ease;

			@media screen and (max-width: 768px) {
				opacity: 1;
			}
		}
	}

	* :global(.menu--red) {
		color: cssvar(error);
	}
</style>
