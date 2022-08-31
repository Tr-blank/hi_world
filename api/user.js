export const getUserPropertyList = () => {
  return $fetch('http://localhost:3000/api/user/user-property-list', {
    method: 'get'
  })
}

export const getUserPropertyByAccount = (account) => {
  return $fetch('http://localhost:3000/api/user/user-property-detail', {
    method: 'get',
    params: { account }
  })
}
