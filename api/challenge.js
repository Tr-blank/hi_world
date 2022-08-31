export const getChallengeList = () => {
  return $fetch('http://localhost:3000/api/challenge/challenge-list', {
    method: 'get'
  })
}

export const addChallenge = (body) => {
  return $fetch('http://localhost:3000/api/challenge/add-challenge', {
    method: 'post',
    body
  })
}

export const updateChallenge = (id, body) => {
  return $fetch(`http://localhost:3000/api/challenge/update-challenge?id=${id}`, {
    method: 'post',
    body
  })
}

export const delChallenge = (id) => {
  return $fetch(`http://localhost:3000/api/challenge/delete-challenge?id=${id}`, {
    method: 'get'
  })
}

export const getChallengeModelList = () => {
  return $fetch('http://localhost:3000/api/challenge/challenge-model-list', {
    method: 'get'
  })
}

export const addChallengeModel = (body) => {
  return $fetch('http://localhost:3000/api/challenge/add-challenge-model', {
    method: 'post',
    body
  })
}

export const updateChallengeModel = (id, body) => {
  return $fetch(`http://localhost:3000/api/challenge/update-challenge-model?id=${id}`, {
    method: 'post',
    body
  })
}

export const delChallengeModel = (id) => {
  return $fetch(`http://localhost:3000/api/challenge/delete-challenge-model?id=${id}`, {
    method: 'get'
  })
}

export const getChallengeTagList = () => {
  return $fetch('http://localhost:3000/api/challenge/challenge-tag-list', {
    method: 'get'
  })
}

export const addChallengeTag = (body) => {
  return $fetch('http://localhost:3000/api/challenge/add-challenge-tag', {
    method: 'post',
    body
  })
}

export const updateChallengeTag = (id, body) => {
  return $fetch(`http://localhost:3000/api/challenge/update-challenge-tag?id=${id}`, {
    method: 'post',
    body
  })
}

export const delChallengeTag = (id) => {
  return $fetch(`http://localhost:3000/api/challenge/delete-challenge-tag?id=${id}`, {
    method: 'get'
  })
}
