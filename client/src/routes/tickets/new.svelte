<div>
  <h1>Create a Ticket</h1>
  <form on:submit|preventDefault={onSubmit}>
    <div class="form-group">
      <label>Title</label>
      <input bind:value={title} class="form-control"/>
    </div>

    <div class="form-group">
      <label>Price</label>
      <input bind:value={price} on:blur={onBlur} class="form-control"/>
    </div>
    {#if err}
      {err}
    {/if}
    <button class="btn btn-primary">Submit</button>
  </form>
</div>
<script>
  import useRequest from '../../hooks/user-request'
  import {goto} from '@sapper/app'

  let price, title, err

  const onBlur = () => {
    const value = parseFloat(price)

    if (isNaN(value)) {
      return
    }

    price = value.toFixed(2)
    console.log(price)
  }

  const onSubmit = async (_) => {
    const {doRequest, errors} = useRequest({
      url: '/api/tickets',
      method: 'post',
      body: {
        title, price
      },
      onSuccess: (ticket) => console.log(ticket),
      onError: (error) => {
        err = error
        console.log(error)
      }
    })

    await doRequest()
    goto('/')

  }
</script>

<style>

</style>