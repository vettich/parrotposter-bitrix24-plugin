<script lang="ts">
	import { Icon } from '@smui/common';
import { _ } from '@src/lib/i18n';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<div class="back-button" on:click={() => dispatch('click')}>
	<Icon class="material-icons-outlined">arrow_back_ios</Icon>
	{$_('actions.back')}
</div>

<style lang="scss">
	@use './src/theme/helpers' as *;

	.back-button {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 4px;
		width: fit-content;
		color: cssvar(secondary);
		cursor: pointer;
		margin: 2em 0 1em;
		opacity: 0.8;
		transition: all 0.2s ease;

		&:hover {
			opacity: 1;
		}

		:global(.material-icons-outlined) {
			font-size: 1em;
		}
	}
</style>
