<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

{#if currentUser}
  <h1>You are signed in</h1>
{:else}
  <h1>You are not signed in</h1>
{/if}

<script context="module">
  import buildClient from '../api/build-client'

  export async function preload(page, { headers }) {
    const { data } = await buildClient(headers).get('/api/users/currentuser')
    return data
  }
</script>

<script>
  import successkid from 'images/successkid.jpg';
  export let currentUser
</script>

<style>

</style>