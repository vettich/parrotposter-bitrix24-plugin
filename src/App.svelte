<script>
	import { Router, Link, Route, navigate, links } from 'svelte-routing';
	import { onDestroy } from 'svelte';

	// pages
	import Home from './pages/Home.page.svelte';
	import Login from './pages/Login.page.svelte';
	import Posts from './pages/Posts.page.svelte';
	import Accounts from './pages/Accounts.page.svelte';

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
	<div use:links>
		<Router>
			<Route path="/login"><Login/></Route>
			<Route path="/posts"><Posts/></Route>
			<Route path="/accounts"><Accounts/></Route>
			<Route path="/"><Home/></Route>
		</Router>
	</div>
{/if}

<style lang="scss" global>
	@use './theme/smui-theme'
</style>
