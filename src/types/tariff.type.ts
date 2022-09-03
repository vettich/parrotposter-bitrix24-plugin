interface Tariff {
	id: string,
	code: string,
	name: string,
	translates: TariffTranslates,
	prices: TariffPrice[]
	limits: TariffLimits,
}

interface TariffTranslates {
	[key: string]: TariffTranslatesFields,
}

interface TariffTranslatesFields {
	name: string,
}

interface TariffPrice {
	currency: TariffCurrency,
	price: number,
	discount_per_month: number,
	max_discount: number,
}

type TariffCurrency = 'rub' | 'usd';

interface TariffLimits {
	accounts_cnt: number,
	posts_cnt: number,
}

interface TariffsReply {
	tariffs: Tariff[],
}

function getTariffName(tariff: Tariff, lang = 'ru') {
	if (tariff.translates[lang]) {
		return tariff.translates[lang].name;
	}
	return tariff.name;
}

const tariffCurrencyLabels: { [key in TariffCurrency]: string } = {
	rub: '₽',
	usd: '$',
}

export type {
	Tariff,
	TariffsReply,
	TariffCurrency,
	TariffPrice,
}

export {
	getTariffName,
	tariffCurrencyLabels,
}
