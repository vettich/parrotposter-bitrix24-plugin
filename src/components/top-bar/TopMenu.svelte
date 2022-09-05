<script lang="ts">
	import { useLocation } from 'svelte-navigator';
	import { menu, type Menu } from '@src/consts/menu';
	import { locale } from '@src/lib/i18n';

	import TopMenuItem from './TopMenuItem.svelte';
	import TopMenuMore from './TopMenuMore.svelte';

	let width: number;
	let menuEl: HTMLDivElement;

	const location = useLocation();

	let showMenu = menu;
	let hiddenMenu: Menu[] = [];

	const toggleMenuItems = (menuEl: HTMLDivElement, width: number) => {
		if (!menuEl || !width) return;

		const hideStartIdx = calcHideStartIndex(menuEl, width);
		hiddenMenu = hideStartIdx == -1 ? [] : [...menu.slice(hideStartIdx, menu.length)];
		showMenu = hideStartIdx == -1 ? menu : [...menu.slice(0, hideStartIdx)]
	}

	const calcHideStartIndex = (menuEl: HTMLDivElement, width: number): number => {
		let itemsWidth = 56; // учитывать ширину кнопки "еще"
		let hideStartIdx = -1;
		menuEl.querySelectorAll('a').forEach((child, idx) => {
			if (hideStartIdx > 0) return;

			const el = child as HTMLElement;
			if (el.clientWidth) itemsWidth += el.clientWidth;

			if (itemsWidth + 1 >= width) {
				hideStartIdx = idx;
				return;
			}
		})
		return hideStartIdx;
	}

	$: $locale && toggleMenuItems(menuEl, width);
</script>

<div class="top-menu top-menu--hidden" bind:clientWidth={width} bind:this={menuEl}>
	{#each menu as {link, label}}
		<TopMenuItem to={link} {label} />
	{/each}
</div>

<div class="top-menu">
	{#each showMenu as {link, label}}
		<TopMenuItem to={link} {label} active={$location.pathname.includes(link)} />
	{/each}
	<TopMenuMore items={hiddenMenu} />
</div>

<style lang="scss">
	.top-menu {
		flex-grow: 1;
		display: flex;
		flex-wrap: wrap;
		height: 100%;

		&--hidden {
			height: 0;
			overflow: hidden;
		}
	}
</style>
