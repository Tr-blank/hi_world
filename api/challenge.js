export const getChallengeList = () => {
  return $fetch('http://localhost:3000/api/challenge/list', {
    method: 'get'
  })
}

export const addChallenge = (body) => {
  return $fetch('http://localhost:3000/api/challenge/add', {
    method: 'post',
    body
  })
}

export const delChallenge = (id) => {
  return $fetch(`http://localhost:3000/api/challenge/delete?id=${id}`, {
    method: 'get'
  })
}
