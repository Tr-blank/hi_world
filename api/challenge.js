export const getChallengeList = () => {
  return $fetch('http://localhost:3000/api/challenge/list', {
    method: 'get'
  })
}
