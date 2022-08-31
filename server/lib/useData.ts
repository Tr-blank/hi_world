export const handleSort = (data, sort: string, key: string|null) => {
  if (!sort || !data) return
  if(!['asc', 'desc'].includes(sort)) return
  return data.sort((a, b) => {
    const aData = key ? a[key] : a 
    const bData = key ? b[key] : b 
    if ( sort === 'asc' ) return aData - bData
    return bData - aData
  })  
}