<script lang="ts">
	import SegmentedButton, { Label, Segment } from '@smui/segmented-button';
	import Select, { Option } from '@smui/select';
import Icon from '@smui/select/icon';

	export let months = 1;

	const values = [
		{months: 1, label: '1 месяц' },
		{months: 3, label: '3 месяца', discount: '-4%' },
		{months: 6, label: '6 месяцев', discount: '-10%' },
		{months: 12, label: '1 год', discount: '-22%' },
	];
	let selected = values.find(v => v.months === months);

	$: months = selected.months;
</script>

<div class="tariffs-periods tariffs-periods--desktop">
	<SegmentedButton segments={values} let:segment singleSelect bind:selected>
		<Segment {segment}>
			<Label>
				{segment.label}
				{#if segment.discount}
					<div class="tariffs-periods__discount">{segment.discount}</div>
				{/if}
			</Label>
		</Segment>
	</SegmentedButton>
</div>

<div class="tariffs-periods tariffs-periods--mobile">
	<Select
		variant="outlined"
		bind:value={selected}
		key={v => `${v}`}
		label="Выберите период подписки"
		style="width: 100%"
		>
		<Icon class="material-icons-outlined" slot="leadingIcon">today</Icon>
		{#each values as value}
			<Option {value}>
				{value.label}
				{#if value.discount}
					<div class="tariffs-periods__discount">{value.discount}</div>
				{/if}
			</Option>
		{/each}
	</Select>
</div>

<style lang="scss">
	@use './src/theme/helpers' as *;

	.tariffs-periods {
		display: flex;
		width: 100%;

		&--desktop {
			@media screen and (max-width: 768px) {
				display: none;
			}
		}

		&--mobile {
			@media screen and (min-width: 768px) {
				display: none;
			}
		}

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
