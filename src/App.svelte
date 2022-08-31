<script>
	import { Router, Route, links } from 'svelte-routing';
	import { navigate } from '@src/tools';

	// stores
	import { user } from './store';

	// components
	import CircularProgress from '@smui/circular-progress';
	import ThemeApplier from './components/ThemeApplier.svelte';

	// pages
	import Home from './pages/Home.page.svelte';
	import Login from './pages/Login.page.svelte';
	import Posts from './pages/Posts.page.svelte';
	import Accounts from './pages/Accounts.page.svelte';
	import PostCreate from './pages/PostCreate.page.svelte';
	import PostEdit from './pages/PostEdit.page.svelte';

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

<ThemeApplier />

{#if loading}
	<CircularProgress style="height: 32px; width: 32px" indeterminate />
{:else}
	<div use:links>
		<Router basepath={import.meta.env.BASE_URL}>
			<Route path="/login"><Login/></Route>
			<Route path="/posts"><Posts/></Route>
			<Route path="/posts/new"><PostCreate/></Route>
			<Route path="/posts/:id" let:params><PostEdit id={params.id}/></Route>
			<Route path="/accounts"><Accounts/></Route>
			<Route path="/"><Home/></Route>
		</Router>
	</div>
{/if}

<style lang="scss" global>
	@use './theme/theme'
</style>
