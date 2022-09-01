<script lang="ts">
	import { Icon } from "@smui/common";

	export let variant: 'filled' | 'outlined' = 'outlined';
	export let size = 24;

	$: className = 'material-icons' + (variant === 'filled' ? '' : '-' + variant);
</script>

<Icon class={className} style="font-size: {size}px" {...$$restProps}>
	<slot />
</Icon>
