<script lang="ts">
	import { theme } from '@src/store';
	import logoSrc from '@src/assets/images/parrotposter-logo-wide.svg';
	import logoDarkSrc from '@src/assets/images/parrotposter-logo-wide-dark.svg';

	export let width = '100%';

	let logo = logoSrc;
	$: logo = $theme === 'dark' ? logoDarkSrc : logoSrc;
</script>

<img src={logo} alt="" style="width: {width}">

<style>
	img {
		display: inline-block;
		margin: 0 auto;
	}
</style>
