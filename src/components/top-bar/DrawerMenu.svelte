<script lang="ts">
	import { navigate } from 'svelte-routing';
	import { menu } from '@src/consts/menu';
	import { user } from '@src/store';

	import List, { Item, Separator, Text } from '@smui/list';
	import Drawer from 'svelte-drawer-component';

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
</script>

<div class="drawer-menu">
	<Drawer bind:open={openDrawer} on:clickAway={() => openDrawer = false}>
		<List>
			{#each menu as {link, label}}
				<Item on:click={go(link)} activated={isActive(link)}><Text>{label}</Text></Item>
			{/each}

			<Separator />

			<Item on:click={logout}><Text>Выйти</Text></Item>
		</List>
	</Drawer>
</div>

<style lang="scss">
	.drawer-menu :global(.drawer .panel) {
		width: 50%;
		min-width: 300px;
		max-width: 600px;

		@media screen and (max-width: 768px) {
			min-width: initial;
			max-width: initial;
			width: 80%;
		}
	}
</style>
