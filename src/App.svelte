<script lang="ts">
	import { Router, links, Route } from 'svelte-navigator';

	// stores
	import { user } from './store';

	// components
	import CircularProgress from '@smui/circular-progress';
	import ThemeApplier from './components/ThemeApplier.svelte';

	// routing
	import PrivateRoute from './components/routing/PrivateRoute.svelte';
	import AuthRoute from './components/routing/AuthRoute.svelte';

	// pages
	import Home from './pages/Home.page.svelte';
	import Login from './pages/Login.page.svelte';
	import Posts from './pages/Posts.page.svelte';
	import Accounts from './pages/Accounts.page.svelte';
	import PostCreate from './pages/PostCreate.page.svelte';
	import PostEdit from './pages/PostEdit.page.svelte';
	import Tariffs from './pages/Tariffs.page.svelte';
	import Integrations from './pages/Integrations.page.svelte';
	import Settings from './pages/Settings.page.svelte';

	let loading = true;

	// navigating onLogin
	user.subscribe($user => {
		if ($user.loading) {
			return;
		}

		loading = false;
	})
</script>

<ThemeApplier />

{#if loading}
	<CircularProgress style="height: 32px; width: 32px" indeterminate />
{:else}
	<div use:links>
		<Router basepath={import.meta.env.BASE_URL}>
			<AuthRoute path="login"><Login/></AuthRoute>

			<Route path="posts/*">
				<PrivateRoute path="new"><PostCreate/></PrivateRoute>
				<PrivateRoute path=":id" let:params><PostEdit id={params.id}/></PrivateRoute>
				<PrivateRoute path="/"><Posts/></PrivateRoute>
			</Route>

			<PrivateRoute path="accounts"><Accounts/></PrivateRoute>
			<PrivateRoute path="tariffs"><Tariffs/></PrivateRoute>
			<PrivateRoute path="integrations"><Integrations/></PrivateRoute>
			<PrivateRoute path="settings"><Settings/></PrivateRoute>

			<PrivateRoute path="/"><Home/></PrivateRoute>
		</Router>
	</div>
{/if}

<style lang="scss" global>
	@use './theme/theme'
</style>
