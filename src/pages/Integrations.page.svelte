<svelte:head>
	<title>Интеграции - ParrotPoster</title>
</svelte:head>

<script>
	import { theme } from '@src/store';
	import { _ } from '@src/lib/i18n';

	import Icon from "@src/components/common/Icon.svelte";
	import Layout from "@src/components/Layout.svelte";

	import bxLogoWhite from '@src/assets/images/bx-logo-white.svg';
	import bxLogoDark from '@src/assets/images/bx-logo-dark.svg';
	import wpLogoWhite from '@src/assets/images/wp-logo-white.svg';
	import wpLogoDark from '@src/assets/images/wp-logo-dark.svg';

	$: bxLogo = $theme === 'light' ? bxLogoDark : bxLogoWhite;
	$: wpLogo = $theme === 'light' ? wpLogoDark : wpLogoWhite;
</script>

<Layout>
	<h1>{$_('integrations.page_title')}</h1>

	<div class="integrations">
		<div class="integration-card mdc-elevation--z4">
			<div class="integration-card__header">
				<div class="integration-card__title">{$_('integrations.bitrix.title')}</div>
				<div class="integration-card__icon">
					<img src={bxLogo} alt="">
				</div>
			</div>
			<div class="integration-card__content">
				{$_('integrations.bitrix.desc')}
			</div>
			<div class="integration-card__action">
				<a class="integration-card__btn"
					href="https://marketplace.1c-bitrix.ru/solutions/vettich.sp3/"
					target="_blank">
					{$_('integrations.bitrix.link')}
					<Icon>east</Icon>
				</a>
			</div>
		</div>

		<div class="integration-card mdc-elevation--z4">
			<div class="integration-card__header">
				<div class="integration-card__title">{$_('integrations.wordpress.title')}</div>
				<div class="integration-card__icon">
					<img src={wpLogo} alt="">
				</div>
			</div>
			<div class="integration-card__content">
				{$_('integrations.wordpress.desc')}
			</div>
			<div class="integration-card__action">
				<a class="integration-card__btn"
					href="https://wordpress.org/plugins/parrotposter/"
					target="_blank">
					{$_('integrations.wordpress.link')}
					<Icon>east</Icon>
				</a>
			</div>
		</div>
	</div>
</Layout>

<style lang="scss">
	@use './src/theme/helpers' as *;

	.integrations {
		display: flex;
		gap: 1em;

		@media screen and (max-width: 768px) {
			flex-direction: column;
		}
	}

	.integration-card {
		display: flex;
		flex-direction: column;
		gap: 1em;
		padding: 1em;
		border-radius: 4px;
		flex-basis: 380px;
		color: cssvar(on-surface);
		background-color: cssvar(surface);

		@media screen and (max-width: 768px) {
			flex-basis: auto;
		}

		&__header {
			display: flex;
			justify-content: space-between;
		}

		&__title {
			font-size: 24px;
		}

		&__icon {
			width: 36px;
			height: 36px;

			img {
				width: 100%;
				height: 100%;
				object-fit: contain;
				object-position: center;
			}
		}

		&__btn {
			font-weight: bold;

			&:hover {
				text-decoration: underline;
			}
		}

		&__content {
			flex-grow: 1;
		}
	}
</style>
