<script lang="ts">
	import { Icon } from "@smui/common";

	export let variant: 'filled' | 'outlined' = 'outlined';
	export let size: number = null;

	$: className = 'material-icons' + (variant === 'filled' ? '' : '-' + variant);

	$: styles = [
		size ? `font-size: ${size}px` : null,
	].filter(el => !!el).join(';')
</script>

<Icon class={className} style={styles} {...$$restProps}>
	<slot />
</Icon>
