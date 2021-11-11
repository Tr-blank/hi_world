import jsSHA from 'jssha'

function getAuthorizationHeader() {
  //  填入自己 ID、KEY 開始
  let AppID = '9d9c18d8b32c4cb3b1cebb8ca5f3ebc3'
  let AppKey = '2KRvdM8QKipllYqKuhj89Q8-NHA'
  //  填入自己 ID、KEY 結束
  let GMTString = new Date().toGMTString()
  let ShaObj = new jsSHA('SHA-1', 'TEXT')
  ShaObj.setHMACKey(AppKey, 'TEXT')
  ShaObj.update('x-date: ' + GMTString)
  let HMAC = ShaObj.getHMAC('B64')
  // eslint-disable-next-line no-useless-escape
  let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"'
  return { 'Authorization': Authorization, 'X-Date': GMTString }
}

export const fetchCommonData = () => {

  return $fetch('https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot', {
    headers: getAuthorizationHeader(),
    method: 'GET',
    params: {
      '$format': 'JSON',
      '$select': 'Name'
      // '$filter': 'contains(class1,\'%E6%BA%AB%E6%B3%89\')%20or%20contains(class2, \'%E6%BA%AB%E6%B3%89\')%20or%20contains(class3, \'%E6%BA%AB%E6%B3%89\')'
    }
  })
}
