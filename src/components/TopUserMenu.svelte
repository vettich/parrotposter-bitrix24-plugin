<script>
	import { user } from '../store/user.ts';
</script>

<div class="top-user-menu">
	{$user.data?.name} ({$user.data?.username})
	<div class="items">
		<div class="item" on:click={user.logout}>Выйти</div>
	</div>
</div>

<style>
	.top-user-menu {

	}
</style>
