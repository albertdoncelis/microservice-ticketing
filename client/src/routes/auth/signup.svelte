<form on:submit|preventDefault={handleSubmit}>
  <h1>Sign Up</h1>
  <div class="form-group">
    <label>Email Address</label>
    <input bind:value={email}  class="form-control"/>
  </div>

  <div class="form-group">
    <label>Password</label>
    <input bind:value={password}  class="form-control"/>
  </div>
  {#if errors.length > 0}
    <div class="alert alert-danger">
      <h4>Oooops...</h4>
      <ul class="my-0">
        {#each errors as error}
          <li>{error.message}</li>
        {/each}
      </ul>
    </div>
  {/if}
  <button>Signup</button>
</form>
<script>
  import { goto } from '@sapper/app'

  import axios from 'axios'
  let email = ''
  let password = ''
  let errors = []

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/users/signup', {
        email, password
      })
      goto('/')
    } catch (e) {
      errors = e.response.data.errors
    }
  }
</script>