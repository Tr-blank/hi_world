import { useBody } from 'h3'
import { set } from "../../lib/firestore"

export default defineEventHandler (async (event) => {
  try {
    const { type, shop, user, transactionInfo, transactionItem, userInfo } = await useBody(event.req)

    const iSUserBuy = type === 'buy'
    // 只有購買時需要扣除店家庫存
    if (iSUserBuy) {
      const shopItemIds = shop.items.map(item => item.id)
      const shopItemNumber = shopItemIds.indexOf(transactionItem.id)
      const shopItemStock = shopItemNumber >= 0 ? shop.items[shopItemNumber].stock : 0
      if (shopItemStock - transactionInfo.count > 0) {
        shop.items[shopItemNumber].stock -= transactionInfo.count
      } else {
        shop.items.splice(shopItemNumber, 1)
      }
      await set('shop', shop.id, shop)
    }

    // 更新使用者背包商品庫存
    const userItemIds = user.items.map(item => item.id)
    const userItemNumber = userItemIds.indexOf(transactionItem.id)
    if (userItemNumber >= 0) {
      iSUserBuy ? user.items[userItemNumber].stock += transactionInfo.count : user.items[userItemNumber].stock -= transactionInfo.count
      if (user.items[userItemNumber].stock <= 0) {
        user.items.splice(userItemNumber, 1)
      }
    } else {
      const newItem = {
        ...transactionItem,
        stock: transactionInfo.count
      }
      user.items.push(newItem)
    }
    await set('storehouse', user.id, user)

    // 更新使用者錢包金額
    const transactionTotalPrice = transactionInfo.count * transactionItem.price
    iSUserBuy ? userInfo.inGameMoney -= transactionTotalPrice : userInfo.inGameMoney += transactionTotalPrice
    await set('userProperty', user.userId, userInfo)
    
    return { status: 200, data: { shop, user } }
  } catch (error) {
    return { status: 400, message: error.message, error }
  }
})
