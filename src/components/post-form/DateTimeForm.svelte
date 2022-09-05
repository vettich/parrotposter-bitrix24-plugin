<script lang="ts">
	import { _ } from '@src/lib/i18n';

	import SegmentedButton, { Label, Segment } from '@smui/segmented-button';
	import DateTimePicker from "./DateTimePicker.svelte";
	import DateTimeDelay from "./DateTimeDelay.svelte";

	export let customDate = new Date();
	export let delayMinutes = 5;
	export let variant: 'now' | 'delay' | 'custom';
	export let editable = true;

	const variants = ['now', 'delay', 'custom'];
</script>

{#if !editable}
	<div class="date-time-form">
		<div class="date-time-form__choice">
			<div class="date-time-form__title">{$_('posts.form.when_publish')}</div>
			<div class="date-time-form__title">
				{customDate.toLocaleString()}
			</div>
		</div>
	</div>
{:else}
	<div class="date-time-form">
		<div class="date-time-form__choice">
			<div class="date-time-form__title">{$_('posts.form.when_publish')}</div>
			<SegmentedButton segments={variants} let:segment singleSelect bind:selected={variant}>
				<Segment {segment}>
					<Label>{$_('posts.form.variants.' + segment)}</Label>
				</Segment>
			</SegmentedButton>
		</div>
	</div>

	{#if variant === 'delay'}
		<DateTimeDelay bind:value={delayMinutes} />
	{/if}

	{#if variant === 'custom'}
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
