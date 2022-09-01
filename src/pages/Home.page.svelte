<script>
	import { useNavigate } from "svelte-navigator";

	const navigate = useNavigate();

	navigate('/posts', { replace: true });
</script>
