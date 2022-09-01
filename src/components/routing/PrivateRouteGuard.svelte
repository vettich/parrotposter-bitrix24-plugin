<script lang="ts">
	import { useLocation } from 'svelte-navigator';
	import { navigate } from '@src/tools';
	import { user } from '@src/store';

	const location = useLocation();

	$: if (!$user.loading && !$user.data) {
		const state = {
			from: $location.pathname + $location.search + $location.hash,
		};
		navigate('/login', { state });
	}
</script>

{#if $user.data}
	<slot />
{/if}
