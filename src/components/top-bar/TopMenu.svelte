<script lang="ts">
	import { menu } from '@src/consts/menu';

	import TopMenuItem from './TopMenuItem.svelte';
</script>

<div class="top-menu">
	{#each menu as {link, label}}
		<TopMenuItem to={link} {label} />
	{/each}
</div>

<style lang="scss">
	.top-menu {
		flex-grow: 1;
		display: flex;
		height: 100%;
	}
</style>
