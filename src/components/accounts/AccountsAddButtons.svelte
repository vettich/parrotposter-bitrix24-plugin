<script lang="ts">
	import { type AccountType, canAddAccount } from "@src/types";
	import { accountsTypes } from "@src/types";
	import { accounts, user } from "@src/store";

	import Button from "@smui/button";
	import CircularProgress from "@src/components/common/CircularProgress.svelte";
	import AccountConnectTg from "./AccountConnectTg.svelte";
	import AccountConnectInsta from "./AccountConnectInsta.svelte";

	const socials = accountsTypes;

	let loading: AccountType;
	let openTgConnect = false;
	let openInstaConnect = false;

	$: cannotAdd = !canAddAccount($user.data);

	const connect = (social: AccountType) => {
		if (!!loading) return;

		if (['vk', 'fb', 'ok'].includes(social)) {
			connectCommon(social);
		} else if (social === 'tg') {
			openTgConnect = true;
		} else if (social === 'insta') {
			openInstaConnect = true;
		}
	}

	const connectCommon = async (social: AccountType) => {
		loading = social;
		accounts.connect(social, { callback_url: location.href })
			.then(({ redirect_url }) => location.href = redirect_url)
			.catch(e => {
				console.log(e)
				loading = null;
			})
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
			disabled={loading === social || cannotAdd}
			title={`Подключить ` + socialLabels[social]}>
			<div class="accounts-add-buttons__social-icon bg-image-white--{social}"/>
			<span class="accounts-add-buttons__label">Подключить</span>
			<!-- <span class="accounts-add-buttons__label">{socialLabels[social]}</span> -->
			{#if loading === social}
				<CircularProgress />
			{/if}
		</Button>
	{/each}
</div>

<AccountConnectTg bind:open={openTgConnect} />
<AccountConnectInsta bind:open={openInstaConnect} />

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
