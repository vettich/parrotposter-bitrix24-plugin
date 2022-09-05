<script lang="ts">
	import { navigate } from '@src/tools';
	import { menu } from '@src/consts/menu';
	import { user } from '@src/store';
	import { _ } from '@src/lib/i18n';

	import Drawer from 'svelte-drawer-component';
	import Button, { Icon as ButtonIcon } from '@smui/button';
	import Icon from '@src/components/common/Icon.svelte';
	import LanguageSwitcher from '../LanguageSwitcher.svelte';
	import ThemeSwitcher from '../ThemeSwitcher.svelte';

	export let openDrawer = false;

	const isActive = (link: string): boolean => {
		return location.pathname.includes(link);
	}

	const go = (link: string): () => void => {
		return () => {
			navigate(link);
			openDrawer = false;
		}
	}

	const logout = () => {
		user.logout();
		openDrawer = false;
	}

	const formatUsername = (): string => {
		if (!$user.data.name) {
			return $user.data.username
		}
		return `${$user.data.name} (${$user.data.username})`
	}
</script>

<div class="drawer-menu">
	<Drawer bind:open={openDrawer} on:clickAway={() => openDrawer = false}>
		<div class="drawer-menu__group">
			<div class="drawer-menu__header">
				<Icon variant="filled" size={72}>account_circle</Icon>
				{formatUsername()}
			</div>

			<div class="drawer-menu__content">
				<div class="drawer-menu__list">
					{#each menu as {link, label, icon}}
						<div
							class="drawer-menu__item"
							class:drawer-menu__item--active={isActive(link)}
							on:click={go(link)}>
							<Icon>{icon}</Icon>
							{$_(label)}
						</div>
					{/each}
				</div>
			</div>

			<div class="drawer-menu__footer">
				<div class="drawer-menu__switchers">
					<LanguageSwitcher />
					<ThemeSwitcher />
				</div>

				<Button on:click={logout}>
					<ButtonIcon class="material-icons-outlined">logout</ButtonIcon>
					{$_('menu.logout')}
				</Button>
			</div>
		</div>
	</Drawer>
</div>

<style lang="scss">
	@use './src/theme/helpers' as *;

	.drawer-menu  {
		:global(.drawer .panel) {
			width: 50%;
			min-width: 300px;
			max-width: 600px;

			@media screen and (max-width: 768px) {
				min-width: initial;
				max-width: initial;
				width: 80%;
			}
		}

		&__group {
			display: flex;
			flex-direction: column;
			height: 100%;
			padding: 1em 0;
			gap: 16px;
		}

		&__header {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 8px;
		}

		&__content {
			flex-grow: 1;
			overflow-y: auto;
		}

		&__list {
			display: flex;
			flex-direction: column;
		}

		&__item {
			display: flex;
			align-items: center;
			gap: 8px;
			padding: 12px 20%;
			cursor: pointer;

			&--active {
				color: cssvar(primary);
				background-color: rgba(cssvar(primary-rgb), 0.15);
				border-right: 3px solid cssvar(primary);
			}
		}

		&__footer {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 10%;
		}

		&__switchers {
			display: flex;
		}
	}
</style>
