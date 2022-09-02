<script lang="ts">
	import { useLocation } from "svelte-navigator";
	import type { Menu } from "@src/consts/menu";

	import MenuList from '@smui/menu';
	import { Anchor } from '@smui/menu-surface';
	import Icon from '../common/Icon.svelte';
	import TopMenuItem from "./TopMenuItem.svelte";

	export let items: Menu[];

	let openMenuList = false;

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

	const location = useLocation();
	$: isActive = items.some(item => $location.pathname.includes(item.link))
</script>


{#if items.length}
	<div class="top-menu__more {Object.keys(anchorClasses).join(' ')}"
		bind:this={anchor}
		use:Anchor={useAnchorParams}
		>
		<div class="top-menu__more-btn-wrap" on:click={() => openMenuList = true}>
			<TopMenuItem tag="div" active={isActive}>
				<Icon>more_horiz</Icon>
			</TopMenuItem>
		</div>

		<MenuList bind:open={openMenuList} anchor={false} bind:anchorElement={anchor} anchorCorner="BOTTOM_LEFT">
			<div class="top-menu__more-items">
				{#each items as {link, label, icon}}
					<TopMenuItem to={link} active={$location.pathname.includes(link)}>
						<div class="top-menu__more-item">
							<Icon size={22}>{icon}</Icon>
							<span>{label}</span>
						</div>
					</TopMenuItem>
				{/each}
			</div>
		</MenuList>
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
