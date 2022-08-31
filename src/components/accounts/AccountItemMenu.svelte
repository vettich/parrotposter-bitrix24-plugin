<script lang="ts">
	import type { MenuComponentDev } from '@smui/menu';
	import Menu from '@smui/menu';
	import { createEventDispatcher } from 'svelte';

	import List, { Item, Text, Graphic } from '@smui/list';
	import IconButton from '@smui/icon-button';

	const dispatch = createEventDispatcher();

	let menu: MenuComponentDev;
</script>

<div class="account-item-menu" on:click|stopPropagation={() => {}}>
	<div class="account-item-menu__icon">
		<IconButton class="material-icons-outlined" on:click={() => menu.setOpen(true)}>more_vert</IconButton>
	</div>

	<Menu bind:this={menu}>
		<List dense>
			<Item on:click={() => dispatch("delete")} class="error">
				<Graphic class="material-icons-outlined">delete</Graphic>
				<Text>Удалить</Text>
			</Item>
		</List>
	</Menu>
</div>

<style lang="scss">
	@use "./src/theme/helpers" as *;

	:root {
		@include cssvars((menu-icon-show: 0), pp-account-item);
	}

	.account-item-menu {
		position: absolute;
		right: 1em;
		top: 1em;

		:global(button) {
			margin: 0;
			width: 28px;
			height: 28px;
			font-size: 1.1em;
		}

		&__icon {
			opacity: cssvar(menu-icon-show, pp-account-item);
			transition: opacity 0.2s ease;

			@media screen and (max-width: 768px) {
				opacity: 1;
			}
		}
	}
</style>
