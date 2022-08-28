<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import type { ImageData } from '@src/store/image-form-list.store';

	import Fab, { Icon } from '@smui/fab';
	import LinearProgress from '@smui/linear-progress';

	export let images: ImageData[];
	export let editable = true;

	const dispatch = createEventDispatcher();

	// mouse & touch moving
	let moving = false;
	let moveAnimating = false;
	let swapImageId: string = '';
	let overImageId: string = '';

	const moveStart = (id: string) => { 
		if (!editable) return;
		moving = true;
		swapImageId = id;
	}

	const moveEnd = () => {
		if (!editable) return;
		moving = false;
		swapImageId = overImageId = '';
	}

	const move = (id: string) => {
		if (!moving || moveAnimating || overImageId === id) return;

		overImageId = id;
		if (swapImageId !== id) dispatch('swap', { from: swapImageId, to: id })
	}

	const touchStart = (id: string) => {
		if (!editable) return;
		return (e: TouchEvent) => {
			const target = (e.target as HTMLElement).closest('.images-form__delete');
			if (target) {
				return;
			}
			e.preventDefault();
			moveStart(id);
		}
	}

	// emulate mouse move
	const touchMove = (e: TouchEvent) => {
		if (!editable) return;
		const target = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY).closest('.images-form__item')
		if (target) {
			const imageId = target.getAttribute('data-id');
			move(imageId);
		}
	}

	// in/out items transition
	const [send, receive] = crossfade({
		fallback(node) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 200,
				easing: quintOut,
				css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

	let animateDurationTimeoutId: any;
	const animateDuration = () => {
		clearTimeout(animateDurationTimeoutId);
		moveAnimating = true;
		animateDurationTimeoutId = setTimeout(() => moveAnimating = false, 100);
		return 100;
	}
</script>

<svelte:window
	on:mouseup={() => moveEnd()}
	on:touchend={() => moveEnd()}
	on:touchmove={touchMove}
	/>

<div class="images-form__list">
	{#each images as { id, src, uploading, progress } (id)}
		<div
			data-id={id}
			on:mousedown|preventDefault={() => moveStart(id)}
			on:touchstart={touchStart(id)}
			on:mousemove={() => move(id)}
			class="images-form__item mdc-elevation--z4"
			class:images-form__item--dragging={swapImageId === id}
			in:receive={{key: id}}
			out:send={{key: id}}
			animate:flip={{duration: animateDuration}}>

			<div class="images-form__image" class:images-form--editable={editable}>
				<img {src} alt="" />
			</div>

			{#if editable}
				<div class="images-form__delete">
					<Fab mini on:click={() => dispatch('delete', id)}>
						<Icon class="material-icons-outlined">delete</Icon>
					</Fab>
				</div>
			{/if}

			{#if uploading && progress}
				<div class="images-form__progress">
					<LinearProgress {progress} closed={!uploading} />
				</div>
			{/if}
		</div>
	{/each}
</div>

<style lang="scss">
	@use './src/theme/helpers' as *;

	.images-form {
		&__list {
			display: flex;
			flex-wrap: wrap;
			gap: 12px;
		}

		&__item {
			position: relative;
			border-radius: 4px;
		}

		&--editable {
			cursor: move;
		}

		&__image {
			width: 112px;
			height: 112px;
			border-radius: 4px;
			overflow: hidden;

			img {
				object-fit: cover;
				width: 100%;
				height: 100%;
			}
		}

		&__delete {
			position: absolute;
			top: -8px;
			right: -6px;
			opacity: 0;
			transition: all 0.2s ease;
			
			@media screen and (max-width: 768px) {
				opacity: 1;
			}
		}

		&__item:hover &__delete {
			opacity: 1;
		}

		&__progress {
			position: absolute;
			bottom: 4px;
			left: 4px;
			right: 4px;
		}
	}
</style>
