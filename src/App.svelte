<script>
	import { Router, Link, Route, navigate } from 'svelte-routing';
	import { onDestroy } from 'svelte';

	// pages
	import Home from './pages/Home.svelte';
	import Login from './pages/Login.svelte';
	import Posts from './pages/Posts.svelte';

	// stores
	import { user } from './store/user.ts';

	let loading = true;

	// navigating onLogin
	const unsubscribe = user.subscribe($user => {
		if ($user.loading) {
			return;
		}

		loading = false;
		// unsubscribe();

		if (!$user.data) {
			navigate('/login');
		} else {
			navigate('/posts');
		}

		console.log('fields', $user.error?.fields);
		console.log('fields contain email', $user.error?.fields?.includes('email'));
	})

</script>

{#if loading}
	Loading...
{:else}
	<Router>
		<Route path="/login"><Login/></Route>
		<Route path="/posts"><Posts/></Route>
		<Route path="/"><Home/></Route>
	</Router>
{/if}

<style>
</style>
