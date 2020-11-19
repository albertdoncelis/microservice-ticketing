<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<h1>Great success!</h1>

<figure>
	<img alt="Success Kid" src="{successkid}">
	<figcaption>Have fun with Sapper!</figcaption>
</figure>

<p><strong>Try editing this file (src/routes/index.svelte) to test live reloading.</strong></p>

<script context="module">
  import axios from 'axios'

  export async function preload(page, { headers }) {
    if (typeof window === 'undefined') {
      // we are on the server
      // request should be made to http://ingress-nginx.ingress-nginx
      // services.namespace.svc.cluster.local
      const { data } = await axios.get('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', {
        headers
      })
      console.log(data, 'server')
      return data
    } else {
      // we are on the browser
      // request can be made with a base url of ''
      const { data } = await axios.get('/api/users/currentuser')
      return data
    }
  }
</script>

<script>
  import successkid from 'images/successkid.jpg';
  export let currentUser
  console.log(currentUser)
</script>

<style>

</style>