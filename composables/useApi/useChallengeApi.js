import { useCustomFetch } from '../useCustomFetch'

export default {
  getChallengeList () {
    return useCustomFetch('/challenge/challenge-list', {
      method: 'get'
    })
  },
  addChallenge (body) {
    return useCustomFetch('/challenge/add-challenge', {
      method: 'post',
      body
    })
  },
  updateChallenge (id, body) {
    return useCustomFetch(`/challenge/update-challenge?id=${id}`, {
      method: 'post',
      body
    })
  },
  delChallenge (id) {
    return useCustomFetch(`/challenge/delete-challenge?id=${id}`, {
      method: 'get'
    })
  },
  getChallengeModelList () {
    return useCustomFetch('/challenge/challenge-model-list', {
      method: 'get'
    })
  },
  addChallengeModel (body) {
    return useCustomFetch('/challenge/add-challenge-model', {
      method: 'post',
      body
    })
  },
  updateChallengeModel (id, body) {
    return useCustomFetch(`/challenge/update-challenge-model?id=${id}`, {
      method: 'post',
      body
    })
  },
  delChallengeModel (id) {
    return useCustomFetch(`/challenge/delete-challenge-model?id=${id}`, {
      method: 'get'
    })
  },
  getChallengeTagList () {
    return useCustomFetch('/challenge/challenge-tag-list', {
      method: 'get'
    })
  },
  addChallengeTag (body) {
    return useCustomFetch('/challenge/add-challenge-tag', {
      method: 'post',
      body
    })
  },
  updateChallengeTag (id, body) {
    return useCustomFetch(`/challenge/update-challenge-tag?id=${id}`, {
      method: 'post',
      body
    })
  },
  delChallengeTag (id) {
    return useCustomFetch(`/challenge/delete-challenge-tag?id=${id}`, {
      method: 'get'
    })
  }
}
