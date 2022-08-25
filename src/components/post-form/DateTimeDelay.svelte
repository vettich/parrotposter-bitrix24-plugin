<script lang="ts">
	import Textfield from "@smui/textfield";
	import Select, { Option } from '@smui/select';

	export let value = 5;

	let selectedMinutes = value;
	let customMinutes = selectedMinutes;

	$: if (selectedMinutes != -1) {
		customMinutes = selectedMinutes;
		value = selectedMinutes;
	} else {
		value = customMinutes;
	}

	const options = [5, 10, 15, 20, 30];
</script>

<div class="date-time-delay">
	<Select
		variant="outlined"
		bind:value={selectedMinutes}
		key={v => `${v}`}
		label="Через N минут"
		style="width: 100%">
		{#each options as v}
			<Option value={v}>{v}</Option>
		{/each}
		<Option value={-1}>Свой вариант</Option>
	</Select>
	{#if selectedMinutes == -1}
		<Textfield
			bind:value={customMinutes}
			style="width: 100%"
			label="Свой вариант"
			type="number"
			variant="outlined"
			/>
	{/if}
</div>

<style lang="scss">
	.date-time-delay {
		display: flex;
		gap: 8px;
	}
</style>
