<svelte:head>
	<title>Тарифы - ParrotPoster</title>
</svelte:head>

<script>
	import { tariffs } from '@src/store';

	import CircularProgress from '@smui/circular-progress';
	import Layout from "@src/components/Layout.svelte";
	import CurrentTariffInfo from "@src/components/tariffs/CurrentTariffInfo.svelte";
	import TariffsList from "@src/components/tariffs/TariffsList.svelte";
	import TariffsPeriods from '@src/components/tariffs/TariffsPeriods.svelte';

	tariffs.load();

	let months = 3;
</script>

<Layout>
	<h1>Тарифы</h1>

	<div class="tariffs-page__content">
		<CurrentTariffInfo />

		{#if $tariffs.loading}
			<CircularProgress style="height: 24px; width: 24px;" indeterminate />
		{:else}
			<TariffsPeriods bind:months />
			<TariffsList {months} />
		{/if}
	</div>
</Layout>

<style lang="scss">
	.tariffs-page {
		&__content {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			gap: 18px;
		}
	}
</style>
