<script>
	import { navigate } from 'svelte-routing';
	import { onMount } from 'svelte';
	import { user } from '../store/user.ts';

</script>

<div class="user-info">
	{$user.data?.name} ({$user.data?.username})
	<button on:click={user.logout}>Выйти</button>
</div>

<h1>Список постов</h1>
