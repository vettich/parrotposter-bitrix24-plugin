<script lang="ts">
	import type { AccountType, ConnectReply } from "@src/types";
	import { accountsTypes } from "@src/types";
	import { api } from "@src/api";

	import Button from "@smui/button";
	import CircularProgress from "@src/components/common/CircularProgress.svelte";

	const socials = accountsTypes;

	let loading: AccountType;

	const connect = (social: AccountType) => {
		if (!!loading) return;

		if (['vk', 'fb', 'ok'].includes(social)) {
			connectCommon(social);
		}
	}

	const connectCommon = async (social: AccountType) => {
		const req = {
			type: social,
			fields: {
				callback_url: location.href,
			}
		}

		let res: ConnectReply;
		try {
			loading = social;
			res = await api.post<ConnectReply>('connect', req);
		} catch (e) {
			console.log(e);
			loading = null;
			return;
		}

		location.href = res.redirect_url;
	}

	const socialLabels: { [key in AccountType]: string } = {
		'vk': 'ВКонтакте',
		'tg': 'Телеграм',
		'ok': 'Одноклассники',
		'fb': 'Facebook',
		'insta': 'Instagram',
	}
</script>

<div class="accounts-add-buttons">
	{#each socials as social}
		<Button
			variant="raised" class="bg-color--{social}"
			on:click={() => connect(social)}
			disabled={loading === social}>
			<div class="accounts-add-buttons__social-icon bg-image-white--{social}"/>
			<span class="accounts-add-buttons__label">Подключить</span>
			<!-- <span class="accounts-add-buttons__label">{socialLabels[social]}</span> -->
			{#if loading === social}
				<CircularProgress />
			{/if}
		</Button>
	{/each}
</div>

<style lang="scss">
	.accounts-add-buttons {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;

		@media screen and (max-width: 768px) {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 12px;
		}

		&__label {
			letter-spacing: initial;
		}

		&__social-icon {
			width: 1.6em;
			height: 1.6em;
			background-size: cover;
			margin-right: 0.6em;
		}
	}
</style>
