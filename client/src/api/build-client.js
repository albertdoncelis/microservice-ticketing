import axios from 'axios'

export default (headers) => {
  if (typeof window === 'undefined') {
    // we are on the server
    // request should be made to http://ingress-nginx.ingress-nginx
    // services.namespace.svc.cluster.local
    return  axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers
    })

  } else {
    // we are on the browser
    // request can be made with a base url of ''
    return axios.create({
      baseURL: '/'
    })
  }
}