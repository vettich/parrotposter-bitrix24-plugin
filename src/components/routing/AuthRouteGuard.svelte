<script lang="ts">
	import { useNavigate, useLocation } from "svelte-navigator";
	import { user } from '@src/store';

	const navigate = useNavigate();
	const location = useLocation();

	$: if (!$user.loading && $user.data) {
		const to = ($location.state && $location.state.from) || '/';
		navigate(to, { replace: true });
	}
</script>

{#if !$user.data}
	<slot />
{/if}
