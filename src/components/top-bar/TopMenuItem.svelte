<script>
	import { onDestroy } from 'svelte';
	import { globalHistory } from 'svelte-routing/src/history';

	export let to = '/';
	export let label = '';

	let isSelected = false;

	const updateSelected = () => {
		isSelected = location.pathname.includes(to);
	}
	updateSelected();

	const unlisten = globalHistory.listen(() => {
		updateSelected();
	})
	onDestroy(unlisten);
</script>

<a href={to} class="top-menu-item" class:top-menu-item--selected={isSelected}>{label}</a>

<style lang="scss">
	@use '../../theme/helpers' as *; 

	.top-menu-item {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 18px;
		line-height: 1;
		height: 100%;
		padding: 0 14px;
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
