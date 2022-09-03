<script>
	import { Link } from 'svelte-navigator';

	import { Icon } from '@smui/common';
	import Logo from '@src/components/Logo.svelte';
	import TopMenu from './TopMenu.svelte';
	import TopUserMenu from './TopUserMenu.svelte';
	import DrawerMenu from './DrawerMenu.svelte';
	import ThemeSwitcher from '../ThemeSwitcher.svelte';

	let openDrawer = false;
</script>

<div class="top-bar__overlay" />

<div class="top-bar mdc-elevation--z4">
	<div class="top-bar__logo">
		<Link to="/posts"><Logo /></Link>
	</div>

	<div class="top-bar__menu">
		<TopMenu />
	</div>

	<div class="top-bar__right-side">
		<ThemeSwitcher />
		<div class="top-bar__user-menu">
			<TopUserMenu />
		</div>
		<div class="top-bar__open-menu-btn" on:click={() => openDrawer = true}>
			<Icon class="material-icons-outlined">menu</Icon>
		</div>
	</div>
</div>

<DrawerMenu bind:openDrawer />

<style lang="scss">
	@use './src/theme/helpers' as *;

	.top-bar {
		position: sticky;
		top: 16px;
		display: flex;
		gap: 1em;
		height: 56px;
		justify-content: center;
		align-items: center;
		margin-bottom: 1em;
		border-radius: 4px;
		background-color: cssvar(surface);
		z-index: 66;

		@media screen and (max-width: 768px) {
			justify-content: space-between;
		}

		&__overlay {
			position: fixed;
			left: 0;
			top: 0;
			right: 0;
			height: calc(40px + 56px);
			backdrop-filter: blur(10px);
			mask: linear-gradient(black 70%, transparent);
			z-index: 65;
		}

		&__right-side {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
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
			padding: 14px;
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
			flex-shrink: 0;
			height: 100%;
			padding: 8px 8px 8px 12px;
			:global(img) {
				width: auto;
				height: 100%;
			}
		}

	}

</style>
