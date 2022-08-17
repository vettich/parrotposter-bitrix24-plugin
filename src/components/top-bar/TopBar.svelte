<script>
	import { link } from 'svelte-routing';

	import { Icon } from '@smui/common';
	import Logo from '../Logo.svelte';
	import TopMenu from './TopMenu.svelte';
	import TopUserMenu from './TopUserMenu.svelte';
	import DrawerMenu from './DrawerMenu.svelte';

	let openDrawer = false;
</script>

<div class="top-bar">
	<a href="/" class="top-bar__logo" use:link><Logo /></a>
	<div class="top-bar__menu">
		<TopMenu />
	</div>
	<div class="top-bar__user-menu">
		<TopUserMenu />
	</div>

	<div class="top-bar__open-menu-btn" on:click={() => openDrawer = true}>
		<Icon class="material-icons">menu</Icon>
	</div>
</div>

<DrawerMenu bind:openDrawer />

<style lang="scss">
	.top-bar {
		display: flex;
		gap: 1em;
		height: 56px;
		justify-content: center;
		align-items: center;
		margin-bottom: 1em;
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
		border-radius: 4px;

		@media screen and (max-width: 768px) {
			justify-content: space-between;
		}

		&__menu {
			flex-grow: 1;
		}

		&__menu, &__user-menu {
			height: 100%;

			@media screen and (max-width: 768px) {
				display: none;
			}
		}

		&__open-menu-btn {
			display: none;
			align-items: center;
			justify-content: center;
			padding: 12px;
			border-radius: 0 4px 4px 0;
			height: 100%;
			transition: background-color 0.2s ease;
			cursor: pointer;

			@media screen and (max-width: 768px) {
				display: flex;
			}

			:global(.material-icons) {
				font-size: 32px;
				color: cssvar(secondary);
			}

			&:hover {
				background-color: rgba(0, 0, 0, 0.06);
			}
		}

		&__logo {
			height: 100%;
			padding: 8px 8px 8px 12px;
			:global(img) {
				width: auto;
				height: 100%;
			}
		}

	}

</style>
