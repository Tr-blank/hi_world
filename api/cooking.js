/*global $fetch*/
export const getCookingMethods = () => {
  return $fetch('http://localhost:3000/api/cooking_methods', {
    method: 'get'
  })
}

export const getUserCookingData = () => {
  return $fetch('http://localhost:3000/api/user_cooking', {
    method: 'get'
  })
}
