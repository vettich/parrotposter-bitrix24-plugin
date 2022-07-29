<script>
	import { navigate } from 'svelte-routing';
	import { user } from '../store/user.ts';

	let username = '';
	let password = '';

	function onLogin() {
		user.login(username, password)
	}
	
</script>

<form on:submit|preventDefault={onLogin}>
	<label class="input">
		<span>Логин</span>
		<input bind:value={username} type="text" placeholder="Введите логин">
	</label>
	<label class="input">
		<span>Пароль</span>
		<input bind:value={password} type="password" placeholder="Введите пароль">
	</label>
	<button>Войти</button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
	}
</style>
