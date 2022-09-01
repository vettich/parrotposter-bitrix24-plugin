<script lang="ts">
	import { Route } from "svelte-navigator";
	import AuthRouteGuard from './AuthRouteGuard.svelte';

	export let path: string;
</script>

<Route {path} let:params let:location>
	<AuthRouteGuard>
		<slot {params} {location} />
	</AuthRouteGuard>
</Route>
