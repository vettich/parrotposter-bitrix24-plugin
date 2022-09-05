<script lang="ts">
	import type { Tariff, TariffCurrency, TariffPrice } from "@src/types";
	import { tariffCurrencyLabels } from '@src/types';
	import { api } from "@src/api";
	import { _ } from "@src/lib/i18n";

	import Button, { Label } from "@smui/button";
	import Icon from "../common/Icon.svelte";
	import CircularProgress from "../common/CircularProgress.svelte";

	export let tariff: Tariff;
	export let months: number = 1;
	export let currency: TariffCurrency = 'rub';
	export let current = false;

	$: price = tariff.prices.find(p => p.currency === currency);

	const calcPriceValue = (price: TariffPrice, months: number): number => {
		let priceValue = price?.price || 0;
		if (months > 1 && priceValue > 0) {
			priceValue = priceValue - (priceValue * (months - 1) * price?.discount_per_month / 100);
		}
		return priceValue;
	}

	$: priceValue = calcPriceValue(price, months);
	$: paymentPrice = priceValue * months;

	interface OrderReply {
		order_url: string,
	}

	let makingRequest = false;
	const gotoPayment = async () => {
		const req = {
			tariff_id: tariff.id,
			period: months,
			success_url: location.href,
			fail_url: location.href,
			back_url: location.href,
		}

		makingRequest = true;
		try {
			const res = await api.post<OrderReply>('orders', req)
			location.href = res.order_url
		} catch (e) {
			console.log(e)
			makingRequest = false;
		}
	}
</script>

<div class="tariff-card mdc-elevation--z4">
	{#if current}
		<div class="tariff-card__current-badge">{$_('tariffs.current')}</div>
	{/if}
	
	<div class="tariff-card__name">{tariff.name}</div>

	<div class="tariff-card__price">
		<div class="tariff-card__price-value">
			{priceValue.toLocaleString()} {tariffCurrencyLabels[currency]}
		</div>
		{$_('tariffs.per_month')}
	</div>

	<ul class="tariff-card__features">
		<li><Icon size={18}>check</Icon> {$_('tariffs.unlimited_posts')}</li>
		<li><Icon size={18}>check</Icon> {$_('tariffs.accounts_cnt', {values: {cnt: tariff.limits.accounts_cnt}})}</li>
	</ul>

	<div class="tariff-card__action">
		<Button on:click={gotoPayment}>
			<Label>
				{paymentPrice.toLocaleString()}{tariffCurrencyLabels[currency]}
				{$_('tariffs.payable')}
			</Label>
			<Icon>east</Icon>
			{#if makingRequest}
				<CircularProgress />
			{/if}
		</Button>
	</div>
</div>

<style lang="scss">
	@use './src/theme/helpers' as *;

	.tariff-card {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 14px;
		flex-basis: 300px;
		padding: 2em 1.5em 1.5em;
		border-radius: 4px;
		overflow: hidden;
		background-color: cssvar(surface);
		color: cssvar(on-surface);

		&__name {
			font-size: 24px;
		}

		&__price-value {
			display: inline;
			font-size: 32px;
		}

		&__features {
			list-style: none;
			display: flex;
			flex-direction: column;
			gap: 12px;
			padding: 0;
			margin: 8px 0;
			color: cssvar(secondary);

			li {
				display: flex;
				gap: 8px;

			}
		}

		&__action {
			width: 100%;

			& :global(button) {
				width: 100%;
			}
		}

		&__current-badge {
			position: absolute;
			right: 0;
			top: 0;
			padding: 40px 20px 2px;
			width: 150px;
			text-align: center;
			transform: translateX(50%) rotate(45deg);
			transform-origin: 50% top;
			font-size: 14px;
			font-weight: bold;
			color: cssvar(on-primary);
			background-color: cssvar(primary);
		}
	}
</style>
