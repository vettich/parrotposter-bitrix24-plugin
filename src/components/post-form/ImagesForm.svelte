<script lang="ts">
	import { createImagesList, type ImageData } from '@src/store/image-form-list.store';
	import { onDestroy } from 'svelte';

	import LinearProgress from '@smui/linear-progress';
	import ImagesFormDropzone from "./ImagesFormDropzone.svelte";

	let images = createImagesList();
	onDestroy(images.deleteAll);

	const dropHandle = async (e: CustomEvent) => {
		const files = e.detail;

		for(const file of files) {
			images.upload(file);
		}
	}
</script>

<div class="images-form">
	{#if $images.length}
		<div class="images-form__list">
			{#each $images as { id, src, uploading, progress } (id)}
				<div class="images-form__item">
					<img {src} alt="" />
					<div class="images-form__progress">
						<LinearProgress {progress} closed={!uploading} />
					</div>
				</div>
			{/each}
		</div>
	{/if}
	<ImagesFormDropzone on:drop={dropHandle} />
</div>

<style lang="scss">
	.images-form {
		display: flex;
		flex-direction: column;
		gap: 8px;

		&__list {
			display: flex;
			flex-wrap: wrap;
			gap: 8px;
		}

		&__item {
			position: relative;
			width: 120px;
			height: 120px;
			border-radius: 4px;
			overflow: hidden;

			img {
				object-fit: cover;
				width: 100%;
				height: 100%;
			}
		}

		&__progress {
			position: absolute;
			bottom: 4px;
			left: 4px;
			right: 4px;
		}
	}
</style>
