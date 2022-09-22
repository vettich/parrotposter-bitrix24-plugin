<script lang="ts">
	import IconButton from '@smui/icon-button';
	import Icon from './common/Icon.svelte';

	import List, { Item, Text } from '@smui/list';
	import Menu from '@smui/menu';
	import { locale } from '@src/lib/i18n';

	let open = false;

	const languages = [
		{ code: 'en', label: 'English' },
		{ code: 'ru', label: 'Русский' },
	];
</script>

<svelte:body on:click|capture={() => open = false} />

<div class="language-switcher">
	<IconButton on:click={() => open = true}>
		<Icon>language</Icon>
	</IconButton>

	<Menu bind:open managed={true} anchorCorner="BOTTOM_LEFT">
		<List dense>
			{#each languages as lang}
				<Item activated={lang.code === $locale} on:click={() => $locale = lang.code}>
					<Text>
						<div class="language-switcher__label">{lang.label}</div>
					</Text>
				</Item>
			{/each}
		</List>
	</Menu>
</div>

<style lang="scss">
	.language-switcher {
		&__label {
			text-transform: uppercase;
		}
	}
</style>
