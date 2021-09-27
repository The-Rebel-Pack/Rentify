export const updateStateObject = (setState, key, value) => {
  setState(prevState => {
    return {
      ...prevState,
      [key]: value
    }
  })
}