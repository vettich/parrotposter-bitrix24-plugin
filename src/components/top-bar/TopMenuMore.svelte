<script lang="ts">
	import { useLocation } from "svelte-navigator";
	import type { Menu } from "@src/consts/menu";
	import { _ } from "@src/lib/i18n";

	import MenuSurface from '@smui/menu-surface';
	import Icon from '../common/Icon.svelte';
	import TopMenuItem from "./TopMenuItem.svelte";

	export let items: Menu[];

	let openMenuList = false;

	const location = useLocation();
	$: isActive = items.some(item => $location.pathname.includes(item.link))
</script>

<svelte:body on:click|capture={() => openMenuList = false} />

{#if items.length}
	<div class="top-menu__more">
		<div class="top-menu__more-btn-wrap" on:click|stopPropagation={() => openMenuList = true }>
			<TopMenuItem tag="div" active={isActive}>
				<Icon>more_horiz</Icon>
			</TopMenuItem>
		</div>

		<MenuSurface bind:open={openMenuList} managed={true} anchorCorner="BOTTOM_LEFT">
			<div class="top-menu__more-items">
				{#each items as {link, label, icon}}
					<TopMenuItem to={link} active={$location.pathname.includes(link)}>
						<div class="top-menu__more-item">
							<Icon size={22}>{icon}</Icon>
							<span>{$_(label)}</span>
						</div>
					</TopMenuItem>
				{/each}
			</div>
		</MenuSurface>
	</div>
{/if}

<style lang="scss">
	@use './src/theme/helpers' as *; 

	.top-menu {
		&__more-btn-wrap{
			height: 100%;
		}

		&__more-items {
			display: flex;
			flex-direction: column;
		}

		&__more-item {
			display: flex;
			height: 56px;
			width: 100%;
			align-items: center;
			gap: 8px;
			font-size: 14px;

			span {
				width: max-content;
				max-width: 200px;
			}
		}
	}
</style>
