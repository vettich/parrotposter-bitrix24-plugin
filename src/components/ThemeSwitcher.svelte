<script lang="ts">
	import { theme } from '@src/store';

	import IconButton, { Icon } from '@smui/icon-button';

	let isDark = true;

	$: isDark = $theme === 'dark';

	const switchTheme = () => {
		$theme = isDark ? 'light' : 'dark';
	}
</script>

<IconButton on:click={switchTheme} pressed={isDark}>
	<Icon class="material-icons-outlined" on>dark_mode</Icon>
	<Icon class="material-icons-outlined">light_mode</Icon>
</IconButton>
