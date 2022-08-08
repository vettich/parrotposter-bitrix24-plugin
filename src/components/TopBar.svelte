<script>
	import { link } from 'svelte-routing';
	import Logo from './Logo.svelte';
	import TopMenu from './TopMenu.svelte';
	import TopUserMenu from './TopUserMenu.svelte';

</script>

<div class="top-bar">
	<a href="/" class="logo" use:link><Logo /></a>
	<TopMenu />
	<TopUserMenu />
</div>

<style>
	.top-bar {
		display: flex;
		gap: 1em;
		height: 32px;
		justify-content: center;
		align-items: center;
		margin-bottom: 1em;
	}

	.logo {
		width: 180px;
	}

	.logo :global(img) {
		width: auto;
		height: 100%;
	}
</style>
