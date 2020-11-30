import axios from 'axios'

export default ({ url, method, body, onSuccess, onError }) => {
  let errors = null
  const doRequest = async () => {
    try {
      console.log('response', url, body, method)
      errors = null
      const response = await axios[method](url, body)
      console.log(response)
      if (onSuccess) {
        onSuccess(response.data)
      }
      return response.data
    } catch (e) {
      // errors = `
      //   <div class="alert alert-danger">
      //     <h4>Ooops....</h4>
      //     <ul class="my-0">
      //       {err.response.data.errors.map(err => (
      //         <li key={err.message}>{err.message}</li>
      //       ))}
      //     </ul>
      //   </div>
      // `
      if (onError) {
        onError(err.response.data.errors)
      }

    }
  }

  return {doRequest, errors}
}