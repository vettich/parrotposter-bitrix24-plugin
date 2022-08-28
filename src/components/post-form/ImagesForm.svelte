<script lang="ts">
	import { createImagesList } from '@src/store/image-form-list.store';

	import ImagesFormDropzone from './ImagesFormDropzone.svelte';
	import ImagesFormSortableList from './ImagesFormSortableList.svelte';

	export let imagesIds: string[] = [];

	let images = createImagesList();

	images.subscribe(images => {
		imagesIds = images
			.map(img => img.fileId)
			.filter(id => id && !!id.length)
	})

	const dropHandle = async (e: CustomEvent<File[]>) => {
		for(const file of e.detail) {
			images.upload(file);
		}
	}

	const onDelete = (e: CustomEvent<string>) => {
		images.deleteById(e.detail);
	}

	const onSwap = (e: CustomEvent<{ from: string, to: string }>) => {
		images.swap(e.detail.from, e.detail.to);
	}
</script>

<div class="images-form">
	{#if $images.length}
		<ImagesFormSortableList images={$images} on:delete={onDelete} on:swap={onSwap} />
	{/if}
	<ImagesFormDropzone on:drop={dropHandle} />
</div>

<style lang="scss">
	.images-form {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
</style>
