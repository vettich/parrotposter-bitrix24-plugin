<script lang="ts">
	import Button from "@smui/button";

	const socials = ['vk', 'tg', 'ok', 'fb', 'insta'];
</script>

<div class="accounts-add-buttons">
	{#each socials as social}
		<Button variant="raised" class="bg-color--{social}">
			<div class="accounts-add-buttons__social-icon accounts-add-buttons__social-icon--{social}"/>
			<span class="accounts-add-buttons__label">Connect</span>
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

			&--vk { background-image: url(assets/images/socials/vk-white.svg); }
			&--tg { background-image: url(assets/images/socials/tg-white.svg); }
			&--ok { background-image: url(assets/images/socials/ok-white.svg); }
			&--fb { background-image: url(assets/images/socials/fb-white.svg); }
			&--insta { background-image: url(assets/images/socials/insta-white.svg); }
		}
	}
</style>
