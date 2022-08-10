<script>
	import TopMenuItem from './TopMenuItem.svelte';
</script>

<div class="top-menu">
	<TopMenuItem to="/posts" label="Посты" />
	<TopMenuItem to="/accounts" label="Аккаунты" />
</div>

<style lang="scss">
	.top-menu {
		flex-grow: 1;
		display: flex;
		height: 100%;
	}
</style>
