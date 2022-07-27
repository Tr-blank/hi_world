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

export const updateChallenge = (id, body) => {
  return $fetch(`http://localhost:3000/api/challenge/update?id=${id}`, {
    method: 'post',
    body
  })
}

export const delChallenge = (id) => {
  return $fetch(`http://localhost:3000/api/challenge/delete?id=${id}`, {
    method: 'get'
  })
}

export const getChallengeModelList = () => {
  return $fetch('http://localhost:3000/api/challenge-model/list', {
    method: 'get'
  })
}

export const addChallengeModel = (body) => {
  return $fetch('http://localhost:3000/api/challenge-model/add', {
    method: 'post',
    body
  })
}

export const updateChallengeModel = (id, body) => {
  return $fetch(`http://localhost:3000/api/challenge-model/update?id=${id}`, {
    method: 'post',
    body
  })
}

export const delChallengeModel = (id) => {
  return $fetch(`http://localhost:3000/api/challenge-model/delete?id=${id}`, {
    method: 'get'
  })
}

export const getChallengeTagList = () => {
  return $fetch('http://localhost:3000/api/challenge-tag/list', {
    method: 'get'
  })
}

export const addChallengeTag = (body) => {
  return $fetch('http://localhost:3000/api/challenge-tag/add', {
    method: 'post',
    body
  })
}

export const updateChallengeTag = (id, body) => {
  return $fetch(`http://localhost:3000/api/challenge-tag/update?id=${id}`, {
    method: 'post',
    body
  })
}

export const delChallengeTag = (id) => {
  return $fetch(`http://localhost:3000/api/challenge-tag/delete?id=${id}`, {
    method: 'get'
  })
}
