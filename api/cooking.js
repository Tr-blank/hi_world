/*global $fetch*/
export const getCookingMethods = () => {
  return $fetch('http://localhost:3000/api/cooking_methods', {
    method: 'get'
  })
}

