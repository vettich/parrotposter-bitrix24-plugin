<script lang="ts">
	import Select, { Option } from '@smui/select';
	import Icon from '@smui/select/icon';
	import { _ } from '@src/lib/i18n';

	export let months = 1;
	export let values: {
		months: number,
		discount?: string,
	}[];
</script>

<Select
	variant="outlined"
	bind:value={months}
	key={v => `${v}`}
	label={$_('tariffs.select_period')}
	style="width: 100%"
	>
	<Icon class="material-icons-outlined" slot="leadingIcon">today</Icon>
	{#each values as value (value.months)}
		<Option value={value.months}>
			{$_('tariffs.months_' + value.months)}
			{#if value.discount}
				({value.discount})
			{/if}
		</Option>
	{/each}
</Select>
