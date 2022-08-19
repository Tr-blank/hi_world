export const getShopByKey = (key) => {
  return $fetch('http://localhost:3000/api/shop/shop-detail', {
    method: 'get',
    params: { key }
  })
}

export const getShopList = () => {
  return $fetch('http://localhost:3000/api/shop/shop-list', {
    method: 'get'
  })
}

export const addShop = (body) => {
  return $fetch('http://localhost:3000/api/shop/add-shop', {
    method: 'post',
    body
  })
}

export const updateShop = (id, body) => {
  return $fetch(`http://localhost:3000/api/shop/update-shop?id=${id}`, {
    method: 'post',
    body
  })
}

export const delShop = (id) => {
  return $fetch(`http://localhost:3000/api/shop/delete-shop?id=${id}`, {
    method: 'get'
  })
}

export const getShopTagList = () => {
  return $fetch('http://localhost:3000/api/shop/shop-tag-list', {
    method: 'get'
  })
}

export const addShopTag = (body) => {
  return $fetch('http://localhost:3000/api/shop/add-shop-tag', {
    method: 'post',
    body
  })
}

export const updateShopTag = (id, body) => {
  return $fetch(`http://localhost:3000/api/shop/update-shop-tag?id=${id}`, {
    method: 'post',
    body
  })
}

export const delShopTag = (id) => {
  return $fetch(`http://localhost:3000/api/shop/delete-shop-tag?id=${id}`, {
    method: 'get'
  })
}
