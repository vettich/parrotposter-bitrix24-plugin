<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import Dropzone from 'svelte-file-dropzone';

	const dispatch = createEventDispatcher();

	let dragging = false;

	const dropHandle = (e: CustomEvent) => {
		const { acceptedFiles } = e.detail;
		dragging = false;
		dispatch('drop', acceptedFiles);
	}
</script>

<div class="images-form-dropzone" class:images-form-dropzone--dragging={dragging}>
	<Dropzone
		on:dropaccepted={dropHandle}
		on:dragenter={() => dragging = true}
		on:dragleave={() => dragging = false}
		accept="image/*"
		multiple>
		Нажмите, чтобы выбрать картинки, <br> или перетащите их сюда
	</Dropzone>
</div>

<style lang="scss">
	@use './src/theme/helpers' as *;

	.images-form-dropzone {
		position: relative;
		text-align: center;
		cursor: pointer;

		&:before {
			content: "";
			position: absolute;
			display: block;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			background-color: cssvar(primary);
			opacity: 0;
			transition: all 0.2s ease;
		}

		&--dragging:before,
		&:focus:before {
			opacity: 0.1;
		}

		:global(.dropzone) {
			position: relative;
			background-color: transparent;
			border-width: 2px;
			border-color: rgba(cssvar(secondary-rgb), 0.7);
			color: cssvar(secondary);
			transition: all 0.2s ease;
			z-index: 2;
		}

		&:hover :global(.dropzone) {
			border-color: cssvar(secondary);
		}

		&--dragging :global(.dropzone) {
			border-color: cssvar(primary);
			color: cssvar(primary);
		}
	}
</style>

