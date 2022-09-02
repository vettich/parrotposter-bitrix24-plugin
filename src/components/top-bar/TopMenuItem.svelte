<script lang="ts">
	import { withBasePath } from '@src/tools';

	export let tag = 'a';
	export let to = '/';
	export let label = '';
	export let active = false;
</script>

<svelte:element
	this={tag}
	href={withBasePath(to)}
	class="top-menu-item" class:top-menu-item--selected={active}
	{...$$restProps}
	>
	<slot>
		{label}
	</slot>
</svelte:element>

<style lang="scss">
	@use './src/theme/helpers' as *; 

	.top-menu-item {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 18px;
		line-height: 1;
		height: 100%;
		padding: 0 14px;
		cursor: pointer;
		color: cssvar(on-surface);
		border-bottom: 2px solid transparent;
		transition: all 0.2s ease;

		&--selected {
			color: cssvar(primary);
			border-bottom: 2px solid cssvar(primary);
			z-index: 1;

			&:before {
				content: "";
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				background-color: cssvar(primary);
				opacity: 0.1;
				z-index: 0;
			}
		}

		&:hover {
			text-decoration: none;
			border-bottom: 2px solid cssvar(primary);
		}
	}
</style>
