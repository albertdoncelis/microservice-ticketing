<script context="module">
  import buildClient from '../api/build-client'

  export async function preload(page, { headers }) {
    const { data } = await buildClient(headers).get('/api/users/currentuser')
    return data
  }
</script>
<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style>
</style>

<main>
	<slot></slot>
</main>