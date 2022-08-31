<script>
	import CircularProgress from "@smui/circular-progress";
</script>

<div class="circular-progress">
	<CircularProgress style="height: 24px; width: 24px;" indeterminate />
</div>

<style lang="scss">
	@use './src/theme/helpers' as *;

	.circular-progress {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 4px;
		background-color: rgba(cssvar(background-rgb), 0.55);
	}
</style>
