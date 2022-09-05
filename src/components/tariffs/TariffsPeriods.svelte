<script lang="ts">
	import TariffsPeriodsSegmentButtons from './TariffsPeriodsSegmentButtons.svelte';
	import TariffsPeriodsSelect from './TariffsPeriodsSelect.svelte';

	export let months = 1;

	const values = [
		{months: 1 },
		{months: 3, discount: '-4%' },
		{months: 6, discount: '-10%' },
		{months: 12, discount: '-22%' },
	];
</script>

<div class="tariffs-periods tariffs-periods--desktop">
	<TariffsPeriodsSegmentButtons bind:months {values} />
</div>

<div class="tariffs-periods tariffs-periods--mobile">
	<TariffsPeriodsSelect bind:months {values} />
</div>

<style lang="scss">
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
	}
</style>
