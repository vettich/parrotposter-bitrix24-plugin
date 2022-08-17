<script>
	import { Router, Route, navigate, links } from 'svelte-routing';

	// stores
	import { user } from './store';

	// components
	import CircularProgress from '@smui/circular-progress';

	// pages
	import Home from './pages/Home.page.svelte';
	import Login from './pages/Login.page.svelte';
	import Posts from './pages/Posts.page.svelte';
	import Accounts from './pages/Accounts.page.svelte';

	let loading = true;

	// navigating onLogin
	user.subscribe($user => {
		if ($user.loading) {
			return;
		}

		loading = false;

		if (!$user.data) {
			navigate('/login');
		} else {
			navigate('/posts');
		}
	})
</script>

{#if loading}
	<CircularProgress style="height: 32px; width: 32px" indeterminate />
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
