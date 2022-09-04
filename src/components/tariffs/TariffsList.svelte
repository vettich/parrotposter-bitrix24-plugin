<script lang="ts">
	import { tariffs, user } from '@src/store';

	import TariffCard from './TariffCard.svelte';

	export let months = 1;
</script>

<div class="tariffs-list">
	{#each $tariffs.data as tariff (tariff.id)}
		<TariffCard {tariff} {months} current={$user.data.tariff.id === tariff.id} />
	{/each}
</div>

<style lang="scss">
	.tariffs-list {
		display: flex;
		gap: 12px;
		width: 100%;

		@media screen and (max-width: 768px) {
			display: grid;
			grid-template-columns: 1fr 1fr;
		}

		@media screen and (max-width: 500px) {
			grid-template-columns: 1fr;
		}
	}
</style>
