<script lang="ts">
	import { Router, links, Route } from 'svelte-navigator';
	import { isLoaded as isLocaleLoaded } from '@src/lib/i18n';

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
	// auth pages
	import Login from './pages/auth/Login.page.svelte';
	import Signup from './pages/auth/Signup.page.svelte';
	import ForgotPassword from './pages/auth/ForgotPassword.page.svelte';
	import ResetPasswordSent from './pages/auth/ResetPasswordSent.page.svelte';
	import ResetPassword from './pages/auth/ResetPassword.page.svelte';
	import ResetPasswordSuccess from './pages/auth/ResetPasswordSuccess.page.svelte';
	// posts pages
	import Posts from './pages/posts/Posts.page.svelte';
	import PostCreate from './pages/posts/PostCreate.page.svelte';
	import PostEdit from './pages/posts/PostEdit.page.svelte';
	// other
	import Accounts from './pages/Accounts.page.svelte';
	import Tariffs from './pages/Tariffs.page.svelte';
	import Integrations from './pages/Integrations.page.svelte';
	import Settings from './pages/Settings.page.svelte';

	let loading = true;

	// wait verify user logged in
	user.subscribe($user => {
		if ($user.loading) {
			return;
		}

		loading = false;
	})
</script>

<ThemeApplier />

{#if loading || !$isLocaleLoaded}
	<CircularProgress style="height: 32px; width: 32px" indeterminate />
{:else}
	<div use:links>
		<Router basepath={import.meta.env.BASE_URL}>
			<AuthRoute path="login"><Login/></AuthRoute>
			<AuthRoute path="signup"><Signup/></AuthRoute>
			<Route path="forgot-password"><ForgotPassword/></Route>
			<Route path="reset-password-sent"><ResetPasswordSent/></Route>
			<Route path="reset-password/:token" let:params><ResetPassword token={params.token}/></Route>
			<Route path="reset-password-success"><ResetPasswordSuccess/></Route>

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
