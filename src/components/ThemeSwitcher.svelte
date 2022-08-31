<script lang="ts">
	import { theme } from '@src/store';

	import IconButton, { Icon } from '@smui/icon-button';

	let isDark = true;

	$: isDark = $theme === 'dark';
	$: title = isDark ? 'Переключить на светлую тему' : 'Переключить на темную тему';

	const switchTheme = () => {
		$theme = isDark ? 'light' : 'dark';
	}
</script>

<IconButton on:click={switchTheme} pressed={isDark} {title}>
	<Icon class="material-icons-outlined" on>dark_mode</Icon>
	<Icon class="material-icons-outlined">light_mode</Icon>
</IconButton>
