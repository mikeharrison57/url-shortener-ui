const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
    .then((resp) => {
      if (!resp.ok) {
        throw new Error(resp.statusText)
      }
      console.log(resp)
      return resp.json()
    })
}

export {getUrls}