<svelte:head>
	<title>Тарифы - ParrotPoster</title>
</svelte:head>

<script>
	import { tariffs } from '@src/store';
	import { _ } from '@src/lib/i18n';

	import CircularProgress from '@smui/circular-progress';
	import Layout from "@src/components/Layout.svelte";
	import CurrentTariffInfo from "@src/components/tariffs/CurrentTariffInfo.svelte";
	import TariffsList from "@src/components/tariffs/TariffsList.svelte";
	import TariffsPeriods from '@src/components/tariffs/TariffsPeriods.svelte';
	import Paper from '@smui/paper';
	import Icon from '@src/components/common/Icon.svelte';

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

			<Paper>
				<ul>
					<li>
						<Icon size={16}>commit</Icon> {$_('tariffs.hint.prolong')}
					</li>
					<li>
						<Icon size={16}>commit</Icon> {$_('tariffs.hint.switch_tariff')}
					</li>
				</ul>
			</Paper>
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

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 8px;

		li {
			display: flex;
			align-items: center;
			gap: 8px;
		}
	}
</style>
