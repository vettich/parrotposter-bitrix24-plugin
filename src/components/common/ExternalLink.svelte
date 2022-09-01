<script lang="ts">
	import Icon from "@src/components/common/Icon.svelte";

	export let href: string;
	export let title: string = "";
</script>

<a {href} {title} target="_blank">
	<slot />
	<Icon>open_in_new</Icon>
</a>
