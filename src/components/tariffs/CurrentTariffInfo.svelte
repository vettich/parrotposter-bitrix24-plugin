<script lang="ts">
	import moment from 'moment';
	import { user, tariff } from '@src/store';
	import { getTariffName } from '@src/types';
	import { _, locale, date } from '@src/lib/i18n';

	import Icon from '../common/Icon.svelte';

	$: if ($user.data) {
		tariff.fetchById($user.data.tariff.id || $user.data.tariff.code);
	}

	$: tariffExpiryAt = new Date($user.data?.tariff.expiry_at);
	$: tariffExpired = moment().diff(tariffExpiryAt) > 0;
	$: tariffLeft = $locale && moment(tariffExpiryAt).fromNow();

	$: limits = $user.data?.tariff_limits;
</script>

<div class="current-tariff-info mdc-elevation--z4">
	<div class="current-tariff-info__group mdc-elevation--z4">
		<div class="current-tariff-info__icon">
			<Icon>card_membership</Icon>
		</div>
		<div class="current-tariff-info__label">
			{$_('tariffs.your_tariff')}
		</div>
		<div class="current-tariff-info__value">
			{#if $tariff.data}
				{getTariffName($tariff.data, $locale)}
			{:else}
				...
			{/if}
		</div>
	</div>

	<div class="current-tariff-info__group mdc-elevation--z4">
		<div class="current-tariff-info__icon">
			<Icon>people_alt</Icon>
		</div>
		<div class="current-tariff-info__label">
			{$_('tariffs.your_account_limits_label')}
		</div>
		<div class="current-tariff-info__value">
			{$_('tariffs.your_account_limits', {values: {current: limits.accounts_current_cnt, total: limits.accounts_cnt}})}
		</div>
	</div>

	<div class="current-tariff-info__group mdc-elevation--z4">
		<div class="current-tariff-info__icon">
			<Icon>schedule</Icon>
		</div>
		<div class="current-tariff-info__label">
			{$_('tariffs.your_tariff_expiry_at')}
		</div>
		<div class="current-tariff-info__value">
			{#if tariffExpired}
				{$_('tariffs.expired')}
			{:else}
				{$date(tariffExpiryAt)} ({ tariffLeft })
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	@use './src/theme/helpers' as *;

	.current-tariff-info {
		display: inline-flex;
		gap: 12px;

		@media screen and (min-width: 768px) {
			box-shadow: none;
		}

		@media screen and (max-width: 768px) {
			flex-direction: column;
			gap: 22px;
			width: 100%;
			border-radius: 4px;
			padding: 16px;
			background-color: cssvar(surface);
		}

		&__group {
			display: grid;
			grid-template-columns: min-content max-content;
			grid-template-rows: 1fr 1fr;
			grid-template-areas:
				"a b"
				"a c";
			gap: 4px;
			border-radius: 4px;
			padding: 16px;
			background-color: cssvar(surface);

			@media screen and (max-width: 768px) {
				border-radius: 0;
				padding: 0;
				background-color: transparent;
				box-shadow: none;
			}
		}

		&__icon {
			grid-area: a;
			margin-right: 8px;
			display: flex;
			align-items: center;

			& > :global(*) {
				font-size: 36px;
			}
		}

		&__label {
			grid-area: b;
			font-size: 14px;
		}

		&__value {
			grid-area: c;
			font-weight: bold;
		}
	}
</style>
