<script lang="ts">
	import { Router, Link, Route, navigate } from 'svelte-routing';
	import { onDestroy } from 'svelte';

	// pages
	import Home from './pages/Home.svelte';
	import Login from './pages/Login.svelte';
	import Posts from './pages/Posts.svelte';

	// stores
	import { user } from './store/user.ts';

	let loading = false;

	// navigating onLogin
	user.subscribe($user => {
		loading = $user.loading;
		if ($user.loading) {
			return;
		}

		if (!$user.data) {
			navigate('/login');
		} else {
			navigate('/posts');
		}
	})

</script>

{#if loading}
	Loading...
{:else}
	<Router>
		<div>
			<Route path="/login"><Login/></Route>
			<Route path="/posts"><Posts/></Route>
			<Route path="/"><Home/></Route>
		</div>
	</Router>
{/if}

<style>
</style>
