export const getItemList = () => {
  return $fetch('http://localhost:3000/api/item/item-list', {
    method: 'get'
  })
}

export const addItem = (body) => {
  return $fetch('http://localhost:3000/api/item/add-item', {
    method: 'post',
    body
  })
}

export const updateItem = (id, body) => {
  return $fetch(`http://localhost:3000/api/item/update-item?id=${id}`, {
    method: 'post',
    body
  })
}

export const delItem = (id) => {
  return $fetch(`http://localhost:3000/api/item/delete-item?id=${id}`, {
    method: 'get'
  })
}

export const getItemTagList = () => {
  return $fetch('http://localhost:3000/api/item/item-tag-list', {
    method: 'get'
  })
}

export const addItemTag = (body) => {
  return $fetch('http://localhost:3000/api/item/add-item-tag', {
    method: 'post',
    body
  })
}

export const updateItemTag = (id, body) => {
  return $fetch(`http://localhost:3000/api/item/update-item-tag?id=${id}`, {
    method: 'post',
    body
  })
}

export const delItemTag = (id) => {
  return $fetch(`http://localhost:3000/api/item/delete-item-tag?id=${id}`, {
    method: 'get'
  })
}
