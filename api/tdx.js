export const getTourismCity = () => {
  return $fetch('http://localhost:3000/api/tourism_city', {
    method: 'get'
  })
}

export const getTourism = (params) => {
  return $fetch('http://localhost:3000/api/tourism', {
    method: 'get',
    params
  })
}
