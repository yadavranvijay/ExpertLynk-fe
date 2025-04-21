export const authHeader = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token != null) {
    return { Authorization: token };
  } else {
    return {};   
  }
}


export const canonicalizeResponse = (response) => {
  if (response && response.status === 200) {
      return response.data
  } else {
      if (response) {
          response.error = true
          response.message = response.data.message
      } else {
          return {error: true, message: "Unknown Error", description: "Unknown", status: 500}
      }

  }
  return response
}