export const actionLogger = store => next => action => {
  console.log(action.type)
  let result = next(action)
  return result
}