<script lang="ts">
	import SegmentedButton, { Label, Segment } from '@smui/segmented-button';
	import DateTimePicker from "./DateTimePicker.svelte";
	import DateTimeDelay from "./DateTimeDelay.svelte";

	export let customDate = new Date();
	export let delayMinutes = 5;
	export let variant: 'now' | 'delay' | 'custom';
	export let editable = true;

	interface Choice {
		key: 'now' | 'delay' | 'custom',
		label: string,
	}

	const choices: Choice[] = [
		{ key: 'now', label: 'Сейчас' },
		{ key: 'delay', label: 'Через N минут' },
		{ key: 'custom', label: 'Точное время' },
	]
	let selected = choices.find(choice => choice.key === variant);

	$: variant = selected.key;
</script>

{#if !editable}
	<div class="date-time-form">
		<div class="date-time-form__choice">
			<div class="date-time-form__title">Когда публиковать</div>
			<div class="date-time-form__title">
				{customDate.toLocaleString()}
			</div>
		</div>
	</div>
{:else}
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
	}
</style>
