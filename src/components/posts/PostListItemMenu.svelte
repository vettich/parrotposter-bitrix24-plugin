<script lang="ts">
	import Menu from '@smui/menu';
	import type { MenuComponentDev } from '@smui/menu';
	import { createEventDispatcher } from 'svelte';
	import { _ } from '@src/lib/i18n';

	import List, { Item, Text, Graphic } from '@smui/list';
	import IconButton from '@smui/icon-button';

	export let hideEdit = false;

	const dispatch = createEventDispatcher();

	let menu: MenuComponentDev;
</script>

<div class="post-list-item-menu" on:click|stopPropagation={() => {}}>
	<div class="post-list-item-menu__icon">
		<IconButton class="material-icons-outlined" on:click={() => menu.setOpen(true)}>more_vert</IconButton>
	</div>

	<Menu bind:this={menu}>
		<List dense>
			{#if !hideEdit}
				<Item on:click={() => dispatch("edit")}>
					<Graphic class="material-icons-outlined">edit</Graphic>
					<Text>{$_('actions.edit')}</Text>
				</Item>
			{/if}
			<Item on:click={() => dispatch("delete")} class="error">
				<Graphic class="material-icons-outlined">delete</Graphic>
				<Text>{$_('actions.delete')}</Text>
			</Item>
		</List>
	</Menu>
</div>

<style lang="scss">
	@use "./src/theme/helpers" as *;

	:root {
		@include cssvars((menu-icon-show: 0), pp-post-list-item);
	}

	.post-list-item-menu {
		:global(button) {
			margin: 0;
			width: 28px;
			height: 28px;
			font-size: 1.1em;
		}

		&__icon {
			opacity: cssvar(menu-icon-show, pp-post-list-item);
			transition: opacity 0.2s ease;

			@media screen and (max-width: 768px) {
				opacity: 1;
			}
		}
	}
</style>
