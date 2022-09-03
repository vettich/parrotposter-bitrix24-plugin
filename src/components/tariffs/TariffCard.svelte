<script lang="ts">
	import type { Tariff, TariffCurrency, TariffPrice } from "@src/types";
	import { tariffCurrencyLabels } from '@src/types';

	import Button, { Label } from "@smui/button";
	import Icon from "../common/Icon.svelte";

	export let tariff: Tariff;
	export let months: number = 1;
	export let currency: TariffCurrency = 'rub';

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
</script>

<div class="tariff-card mdc-elevation--z4">
	<div class="tariff-card__name">{tariff.name}</div>

	<div class="tariff-card__price">
		<div class="tariff-card__price-value">
			{priceValue.toLocaleString()} {tariffCurrencyLabels[currency]}
		</div>
		/ месяц
	</div>

	<ul class="tariff-card__features">
		<li><Icon size={18}>check</Icon> Неограниченное количество постов</li>
		<li><Icon size={18}>check</Icon> {tariff.limits.accounts_cnt} аккаунтов социальных сетей</li>
	</ul>

	<div class="tariff-card__action">
		<Button>
			<Label>
				{paymentPrice.toLocaleString()}{tariffCurrencyLabels[currency]} к оплате
			</Label>
			<Icon>east</Icon>
		</Button>
	</div>
</div>

<style lang="scss">
	@use './src/theme/helpers' as *;

	.tariff-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 14px;
		flex-basis: 300px;
		padding: 2em 1.5em;
		border-radius: 4px;
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
	}
</style>
