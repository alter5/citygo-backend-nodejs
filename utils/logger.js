const info = (...params) => {
  const result = getResultString(...params)
  console.log(result)
}

const error = (...params) => {
  const result = getResultString(...params)
  console.error(result)
}

const getResultString = (...params) => {
  const strings = convertVariablesToStrings([...params])
  return strings.join("\n")
}

const convertVariablesToStrings = (arrayOfElements) => {
  return arrayOfElements.map((elem) =>
    typeof elem === 'object' ? JSON.stringify(elem, null, 2) : elem
  )
}

module.exports = {
  info,
  error
}
