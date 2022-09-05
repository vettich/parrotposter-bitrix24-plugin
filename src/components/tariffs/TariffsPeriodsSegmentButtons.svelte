<script lang="ts">
	import SegmentedButton, { Label, Segment } from '@smui/segmented-button';
	import { _ } from '@src/lib/i18n';

	export let months = 1;
	export let values: {
		months: number,
		discount?: string,
	}[];

	$: selected = values.find(v => v.months === months);
</script>

<SegmentedButton segments={values} let:segment singleSelect {selected}>
	<Segment {segment} on:click={() => months = segment.months}>
		<Label>
			{$_('tariffs.months_' + segment.months)}
			{#if segment.discount}
				<div class="tariffs-periods__discount">{segment.discount}</div>
			{/if}
		</Label>
	</Segment>
</SegmentedButton>

<style lang="scss">
	@use './src/theme/helpers' as *;

	.tariffs-periods {
		&__discount {
			display: inline;
			font-size: 11px;
			font-weight: bold;
			padding: 4px 8px;
			margin-left: 4px;
			border-radius: 50px;
			vertical-align: bottom;
			color: cssvar(on-primary);
			background-color: cssvar(primary);
		}
	}
</style>
