<script lang="ts">
	import type { PostImageSize } from '../../types';
	import Dialog, { Content as DialogContent } from '@smui/dialog';

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

<div class="images images--size-{size}">
	{#each (images || []) as image, idx (idx)}
		<img src={image.thumbnail} alt="" on:click|stopPropagation={() => selectImage(image)}>
	{/each}
</div>

<Dialog bind:open={imageDialogOpen}
	surface$style="width: 650px; max-width: calc(100vw - 42px);"
	on:click={stopPropagation}>
	<DialogContent>
		<img class="image-in-dialog" src={selectedImageOrigin} alt="">
	</DialogContent>
</Dialog>

<style lang="scss">
	.images {
		display: flex;
		gap: 4px;

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
	}

	.image-in-dialog {
		display: block;
		margin: 0 auto;
		max-height: 80vh;
		max-width: 100%;
	}
</style>
