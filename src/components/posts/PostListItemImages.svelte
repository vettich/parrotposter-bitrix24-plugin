<script lang="ts">
	import type { PostImageSize } from '../types';
	import Dialog, { Content as DialogContent } from '@smui/dialog';

	export let images: PostImageSize[];

	let imageDialogOpen: boolean = false;
	let selectedImageOrigin: string = '';

	$: _images = images || [];

	const selectImage = (image) => {
		selectedImageOrigin = image.original;
		imageDialogOpen = true;
	}
</script>

<div class="images">
	{#each _images as image, idx (idx)}
		<img src={image.thumbnail} alt="" on:click={() => selectImage(image)}>
	{/each}
</div>

<Dialog bind:open={imageDialogOpen} surface$style="width: 650px; max-width: calc(100vw - 42px);">
	<DialogContent>
		<img class="image-in-dialog" src={selectedImageOrigin} alt="">
	</DialogContent>
</Dialog>

<style lang="scss">
	.images {
		display: flex;
		gap: 4px;

		img {
			width: 36px;
			height: 36px;
			border-radius: 4px;
			cursor: pointer;
		}
	}

	.image-in-dialog {
		display: block;
		margin: 0 auto;
		max-height: 80vh;
		max-width: 100%;
	}
</style>
