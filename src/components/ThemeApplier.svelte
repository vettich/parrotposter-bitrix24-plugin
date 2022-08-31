<script lang="ts">
	import { theme, type ThemeVariant } from '@src/store';
	import { withBasePath } from '@src/tools';

	let body: HTMLBodyElement;

	const applyTheme = (theme: ThemeVariant, body: HTMLBodyElement) => {
		if (theme === 'dark') body?.classList.add('dark-theme')
		else body?.classList.remove('dark-theme');
	}

	$: applyTheme($theme, body);

	const storeBodyElement = (node: HTMLBodyElement) => { body = node };
</script>

<svelte:head>
	{#if $theme === 'light'}
		<link rel="stylesheet" href={withBasePath("/smui.css")} />
	{:else}
		<link rel="stylesheet" href={withBasePath("/smui-dark.css")} />
	{/if}
</svelte:head>

<svelte:body use:storeBodyElement />
