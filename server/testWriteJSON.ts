import fs from 'fs'
import jsSHA from 'jssha'

const TDX_API_APP_ID = process.env.TDX_API_APP_ID
const TDX_API_APP_KEY = process.env.TDX_API_APP_KEY

const getAuthorizationHeader = () => {
  //  填入自己 ID、KEY 開始
  let AppID = TDX_API_APP_ID
  let AppKey = TDX_API_APP_KEY
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

function writeJSON(fileName: string, newData: any) {
  //先將原本的 json 檔讀出來
  fs.readFile(`./server/data/tourism_${fileName}.json`, function (err: any, fileContent: { toString: () => any }) {
    if (err) {
      return console.error(err)
    }
    //將二進制數據轉換為字串符
    var user = fileContent.toString()
    //將字符串轉換為 JSON 對象
    user = JSON.parse(user)
    //將傳來的資訊推送到數組對象中
    user.data = newData
    user.total = user.data.length 

    //因為寫入文件（json）只認識字符串或二進制數，所以需要將json對象轉換成字符串
    var str = JSON.stringify(user)
    //將字串符傳入您的 json 文件中 
    fs.writeFile(`./server/data/tourism_${fileName}.json`, str, function (err: any) {
      if (err) {
        console.error(err)
      }
      console.log('Add new user to fileContent...')
    })
  })
}
export default async () => {
  const cityList = [
    { label: '臺北市', value: 'Taipei' },
    { label: '新北市', value: 'NewTaipei' },
    { label: '桃園市', value: 'Taoyuan' },
    { label: '臺中市', value: 'Taichung' },
    { label: '臺南市', value: 'Tainan' },
    { label: '高雄市', value: 'Kaohsiung' },
    { label: '基隆市', value: 'Keelung' },
    { label: '新竹市', value: 'Hsinchu' },
    { label: '新竹縣', value: 'HsinchuCounty' },
    { label: '苗栗縣', value: 'MiaoliCounty' },
    { label: '彰化縣', value: 'ChanghuaCounty' },
    { label: '南投縣', value: 'NantouCounty' },
    { label: '雲林縣', value: 'YunlinCounty' },
    { label: '嘉義縣', value: 'ChiayiCounty' },
    { label: '嘉義市', value: 'Chiayi' },
    { label: '屏東縣', value: 'PingtungCounty' },
    { label: '宜蘭縣', value: 'YilanCounty' },
    { label: '花蓮縣', value: 'HualienCounty' },
    { label: '臺東縣', value: 'TaitungCounty' },
    { label: '金門縣', value: 'KinmenCounty' },
    { label: '澎湖縣', value: 'PenghuCounty' },
    { label: '連江縣', value: 'LienchiangCounty' },
  ]
  cityList.map(async (city) => {
    const data = await $fetch(`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${city.value}`, {
      headers: getAuthorizationHeader(),
      method: 'GET',
      params: {
        '$format': 'JSON',
        // '$select': 'Name'
      }
    })
    console.log('write', city.value)
    writeJSON(city.value, data)
  })
  // const data = await $fetch(`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei`, {
  //   headers: getAuthorizationHeader(),
  //   method: 'GET',
  //   params: {
  //     '$format': 'JSON',
  //     // '$select': 'Name'
  //   }
  // })
  // console.log('write', 'Taipei')
  // writeJSON('taipei', data)
  return
}
