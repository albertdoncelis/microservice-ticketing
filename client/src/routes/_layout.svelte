<script context="module">
  import buildClient from '../api/build-client'

  export async function preload(page, { headers }) {
    const { data } = await buildClient(headers).get('/api/users/currentuser')
    return data
  }
</script>
<script>
  import Nav from '../components/Nav.svelte'
  import { setContext } from 'svelte';
	export let segment;
	export let currentUser;
  setContext('currentUser', currentUser);
</script>

<style>
</style>

<main>
  <Nav></Nav>
  <div class="container">
    <slot currentUser></slot>
  </div>

</main>