export const getStorehouseByUserId = (userId) => {
  return $fetch('http://localhost:3000/api/storehouse/storehouse-detail', {
    method: 'get',
    params: { userId }
  })
}

export const getStorehouseList = () => {
  return $fetch('http://localhost:3000/api/storehouse/storehouse-list', {
    method: 'get'
  })
}

export const addStorehouse = (body) => {
  return $fetch('http://localhost:3000/api/storehouse/add-storehouse', {
    method: 'post',
    body
  })
}

export const updateStorehouse = (id, body) => {
  return $fetch(`http://localhost:3000/api/storehouse/update-storehouse?id=${id}`, {
    method: 'post',
    body
  })
}

export const delStorehouse = (id) => {
  return $fetch(`http://localhost:3000/api/storehouse/delete-storehouse?id=${id}`, {
    method: 'get'
  })
}

export const getStorehouseTagList = () => {
  return $fetch('http://localhost:3000/api/storehouse/storehouse-tag-list', {
    method: 'get'
  })
}

export const addStorehouseTag = (body) => {
  return $fetch('http://localhost:3000/api/storehouse/add-storehouse-tag', {
    method: 'post',
    body
  })
}

export const updateStorehouseTag = (id, body) => {
  return $fetch(`http://localhost:3000/api/storehouse/update-storehouse-tag?id=${id}`, {
    method: 'post',
    body
  })
}

export const delStorehouseTag = (id) => {
  return $fetch(`http://localhost:3000/api/storehouse/delete-storehouse-tag?id=${id}`, {
    method: 'get'
  })
}
