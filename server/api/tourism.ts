import jsSHA from 'jssha'

const getAuthorizationHeader = () => {
  //  填入自己 ID、KEY 開始
  let AppID =  process.env.TDX_API_APP_ID
  let AppKey = process.env.TDX_API_APP_KEY
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


export default async (req) => {
    const cityList = [
        'Taipei',
        'NewTaipei',
        'Taoyuan',
        'Taichung',
        'Tainan',
        'Kaohsiung',
        'Keelung',
        'Hsinchu',
        'HsinchuCounty',
        'MiaoliCounty',
        'ChanghuaCounty',
        'NantouCounty',
        'YunlinCounty',
        'ChiayiCounty',
        'Chiayi',
        'PingtungCounty',
        'YilanCounty',
        'HualienCounty',
        'TaitungCounty',
        'KinmenCounty',
        'PenghuCounty',
        'LienchiangCounty'
      ]
    let resJson = {}
    let queryJson = {}
    if (req.url.includes('city')) {
        const urlQuery = req.url.slice(1)
        const query = urlQuery.split('&')
        for (let i = 0; i < query.length; i++) {
            const queryItem = query[i].split('=')
            queryJson[queryItem[0]] = queryItem[1]
        }
    } else{
        return { status: 400, message: '沒有指定城市' }
    }
    // const queryJson = JSON.parse('{"' + decodeURI(urlQuery.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}')
    const cityName = queryJson?.city || ''
    if (!cityList.includes(cityName)) return { status: 400, message: '台灣沒有此城市' }
    try {
        const data = await $fetch(`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${cityName}`, {
            headers: getAuthorizationHeader(),
            method: 'GET',
            params: {
              '$format': 'JSON',
              // '$select': 'Name'
            }
          })        
          return {
            city: cityName,
            totel: data?.length || 0,
            data,
            status: 200
          }
        } catch (error) {
          return {
            status: 400,
            message: error.Message
          }
        
    }
}
