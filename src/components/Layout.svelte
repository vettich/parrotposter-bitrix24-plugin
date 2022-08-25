<script lang="ts">
	import { TopBar } from './top-bar';
	import Fab, { Icon } from '@smui/fab';

	let showToTopBtn = false;
	let scrollY = 0;
	let innerHeight = 0;
	const toTopBtnThreshold = 0.6;

	$: showToTopBtn = scrollY / innerHeight > toTopBtnThreshold;

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<svelte:window bind:scrollY bind:innerHeight />

<div class="container">
	<TopBar />

	<slot />

	<div class="layout__actions">
		<div class="layout__to-top-btn" class:layout__to-top-btn--show={showToTopBtn}>
			<Fab mini on:click={scrollToTop}>
				<Icon class="material-icons-outlined">arrow_upward</Icon>
			</Fab>
		</div>
		<slot name="actions" />
	</div>
</div>

<style lang="scss">
	.layout {
		&__actions {
			position: fixed;
			display: flex;
			align-items: center;
			gap: 1em;
			bottom: 1em;
			right: 1em;

			:global(button) {
				margin-bottom: 0;
			}
		}

		&__to-top-btn {
			position: relative;
			top: 5em;
			transition: all 0.2s ease;

			&--show {
				top: 0;
			}
		}
	}
</style>
