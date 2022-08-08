<script>
	import { onDestroy } from 'svelte';
	import { navigate } from 'svelte-routing';
	import { globalHistory } from 'svelte-routing/src/history';
	import Button, { Label } from '@smui/button';

	export let to = '/';
	export let label = '';

	let variant = 'outlined';

	const updateVariant = location => {
		variant = location.pathname.includes(to) ? 'unelevated' : 'outlined';
	}

	const unlisten = globalHistory.listen(({ location }) => {
		updateVariant(location);
	})
	updateVariant(globalHistory.location);

	onDestroy(unlisten);

	const go = () => {
		navigate(to);
	}
</script>

<div>
	<Button
		on:click={go}
		{variant}
		color="primary"
		class="button-shaped-round">
		<Label>{label}</Label>
	</Button>
</div>

<style>
	* :global(.button-shaped-round),
	* :global(.button-shaped-round) :global(.mdc-button__ripple)
	{
		border: none;
		border-radius: 999px;
	}
</style>
