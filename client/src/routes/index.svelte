<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

<!--{#if currentUser}-->
<!--  <h1>You are signed in</h1>-->
<!--{:else}-->
<!--  <h1>You are not signed in</h1>-->
<!--{/if}-->
<h2>Tickets</h2>
<table class="table">
  <thead>
    <tr>
      <th>Title</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
  {#each tickets as ticket (ticket.id)}
      <tr>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
      </tr>
  {/each}
  </tbody>
</table>

<script context="module">
  import buildClient from '../api/build-client'

  export async function preload(page, { headers }) {
    const { data } = await buildClient(headers).get('/api/tickets')
    console.log(data)
    return { tickets: data }

  }
</script>

<script>
  import { getContext } from 'svelte'

  export let tickets
  const currentUser = getContext('currentUser')

</script>

<style>

</style>