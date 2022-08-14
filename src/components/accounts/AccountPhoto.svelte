<script lang="ts">
	import type { PostResult, Account } from '../../types';

	export let account: Account = null;
	export let result: PostResult;
	export let size: 'big' | 'normal' = 'normal';

	type Status = null | 'success' | 'fail';

	const getStatus = (): Status => {
		if (!result) return;

		return result.success ? 'success' : 'fail';
	}

	const getType = (): string => {
		if (account) return account.type;

		// id is format "<user_id>:<type>:<social_id>"
		const idPieces = result?.id?.split(':');
		const type = idPieces[1];
		return type;
	}

	$: status = getStatus();
	$: type = getType();

	const formatName = (): string => {
		if (!account) return 'Аккаунт удален';

		let name = account.name + (status ? ` - ${status}` : '');

		return name;
	}

	const placeholderSrc = '/images/placeholder.png';
	const noAccountSrc = '/images/socials/no-account.svg';

	function onError() {
		this.src = placeholderSrc
	}
</script>

<div class="account-photo status-{status} type-{type} size-{size}" class:no-account={!account} title={formatName()}>
	<img src={account?.photo || noAccountSrc} on:error={onError} alt="">
</div>

<style lang="scss">
	@use '../../theme/helpers' as *;

	.account-photo {
		position: relative;
		border: none;
		border-radius: 50%;
		cursor: pointer;

		&:before {
			content: "";
			position: absolute;
			left: -4px;
			bottom: -4px;
			background-position: center;
			background-size: cover;
			border-radius: 50%;
		}

		img {
			width: 100%;
			height: 100%;
			background: url(/images/placeholder.png) center / cover;
			object-fit: cover;
			object-position: center;
			border: none;
			border-radius: 50%;
		}
	}

	.size-normal { width: 36px; height: 36px; }
	.size-big { width: 66px; height: 66px; }

	.size-normal:before { width: 20px; height: 20px; }
	.size-big:before { width: 30px; height: 30px; }

	.status-success { box-shadow: 0px 0px 5px 1px cssvar(success); }
	.status-fail { box-shadow: 0px 0px 5px 1px cssvar(error); }

	.type-vk:before { background-image: url(/images/socials/vk.svg); }
	.type-fb:before { background-image: url(/images/socials/fb.svg); }
	.type-insta:before { background-image: url(/images/socials/insta.svg); }
	.type-tg:before { background-image: url(/images/socials/tg.svg); }
	.type-ok:before { background-image: url(/images/socials/ok.svg); }
	.type-tw:before { background-image: url(/images/socials/tw.svg); }

	.no-account img { background: none };
</style>
