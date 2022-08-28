<script lang="ts">
	import type { PostImageSize } from '@src/types';
	import Dialog, { Content } from '@smui/dialog';

	export let images: PostImageSize[];
	export let notOpen = false;
	export let size: 'small' | 'medium' = 'small';

	let imageDialogOpen: boolean = false;
	let selectedImageOrigin: string = '';

	const selectImage = (image: PostImageSize) => {
		if (notOpen) return;

		selectedImageOrigin = image.original;
		imageDialogOpen = true;
	}

	const stopPropagation = (e: Event) => {
		e.stopPropagation()
	}
</script>

<div class="post-list-item-images post-list-item-images--size-{size}">
	{#each (images || []) as image, idx (idx)}
		<img src={image.thumbnail} alt="" on:click|stopPropagation={() => selectImage(image)}>
	{/each}
</div>

{#if imageDialogOpen}
	<Dialog bind:open={imageDialogOpen}
		surface$style="width: 650px; max-width: calc(100vw - 42px);"
		on:click={stopPropagation}>
		<Content>
			<!-- Хак, чтобы не возникало ошибки фокусировки в консоле при открытии диалога -->
			<input style="position: absolute; z-index: -111; opacity: 0;" />

			<img class="post-list-item-images__origin" src={selectedImageOrigin} alt="">
		</Content>
	</Dialog>
{/if}

<style lang="scss">
	.post-list-item-images {
		display: flex;
		gap: 4px;
		width: 100%;
		overflow-x: auto;

		&--size-small {
			img {
				width: 36px;
				height: 36px;
			}
		}

		&--size-medium {
			gap: 8px;

			img {
				width: 80px;
				height: 80px;
			}
		}

		img {
			border-radius: 4px;
		}

		&__origin {
			display: block;
			margin: 0 auto;
			max-height: 80vh;
			max-width: 100%;
		}
	}
</style>
