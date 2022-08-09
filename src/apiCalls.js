const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
    .then((resp) => {
      if (!resp.ok) {
        throw new Error(resp.statusText)
      }
      // console.log(resp)
      return resp.json()
    })
}

const postUrls = newUrl => {
  return fetch('http://localhost:3001/api/v1/urls', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUrl)
  })
  .then((resp) => {
    if (!resp.ok) {
      throw new Error(resp.statusText)
    }
    console.log(resp)
    return resp.json()
  })
}

export {getUrls, postUrls}