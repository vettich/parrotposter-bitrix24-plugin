<script lang="ts">
	import SegmentedButton, { Label, Segment } from '@smui/segmented-button';
	import Textfield from "@smui/textfield";
	import DateTimePicker from "./DateTimePicker.svelte";
	import DateTimeDelay from "./DateTimeDelay.svelte";

	export let customDate = new Date();
	export let delayMinutes = 5;
	export let variant: 'now' | 'delay' | 'custom';

	interface Choice {
		key: 'now' | 'delay' | 'custom',
		label: string,
	}

	const choices: Choice[] = [
		{ key: 'now', label: 'Сейчас' },
		{ key: 'delay', label: 'Через N минут' },
		{ key: 'custom', label: 'Точное время' },
	]
	let selected = choices[0];

	$: variant = selected.key;
</script>

<div class="date-time-form">
	<div class="date-time-form__choice">
		<div class="date-time-form__title">Когда публиковать</div>
		<SegmentedButton segments={choices} let:segment singleSelect bind:selected>
			<Segment {segment}>
				<Label>{segment.label}</Label>
			</Segment>
		</SegmentedButton>
	</div>
</div>

{#if selected.key === 'delay'}
	<DateTimeDelay bind:value={delayMinutes} />
{/if}

{#if selected.key === 'custom'}
	<DateTimePicker bind:date={customDate} />
{/if}

<style lang="scss">
	@use './src/theme/helpers' as *;

	.date-time-form {
		display: flex;
		flex-direction: column;
		gap: 1em;

		&__choice {
			display: flex;
			flex-direction: column;
			gap: 10px;
		}

		&__title {
			color: cssvar(secondary);
		}

		/* Fix MDC button border visible on focus and selected. */
		/* Need to fix also background-color in selected, but I'm lazy. */
		:global(.mdc-segmented-button__segment) {
			position: relative;
			text-transform: none;
			border-color: initial;
			border-width: 1px;
			margin-right: -1px;
			z-index: 1;

			&:before, &:after {
				content: "";
				position: absolute;
				width: 100%;
				height: 100%;
				left: 0;
				top: 0;
				background-color: cssvar(surface);
				z-index: -1;
			}
		}
		:global(.mdc-segmented-button__segment):focus, :global(.mdc-segmented-button__segment--selected) {
			z-index: 2;

			&:after {
				background-color: cssvar(primary);
				opacity: 0.15;
			}
		}
	}
</style>
