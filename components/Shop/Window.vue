<template>
  <div>
    <div class="flex w-full mb-4">
      <StorehouseList
        title="商店"
        :items="shop.items"
        @update-current-item="updateCurrentItem"
        @select-item="showBuyDialog"
        class="w-1/2 border"
      />
      <div class="w-4" />
      <StorehouseList
        title="背包"
        :items="storehouse.items"
        @update-current-item="updateCurrentItem"
        @select-item="showSellDialog"
        class="w-1/2 border"
      />
    </div>
    <ItemDetail :item="currentItem" class="bg-gray-100 p-2 rounded" />
    <Dialog
      :visible="visibleTransactionDialog"
      :title="transactionDialogTitle"
      @confirm="confirmTransaction"
      @cancel="cancelTransaction"
    >
      <template v-slot:content>
        <div class="text-center font-bold pb-2">{{ currentItem.name }}</div>
        <div class="table w-full">
          <div class="table-header-group">
            <div class="table-row">
              <div class="table-cell px-2 py-1">數量(剩餘庫存: {{ transactionStock }})</div>
              <div class="table-cell px-2 py-1">單價</div>
            </div>
          </div>
          <div class="table-row-group">
            <div class="table-row">
              <div class="table-cell px-2 py-1">
                <input
                  v-model="transactionCount"
                  type="number"
                  min="1"
                  :max="currentItem.stock"
                  @keyup="checkCount"
                  class="border w-full px-2 py-1"
                >
              </div>
              <div class="table-cell px-2 py-1">{{ currentItem.price }}</div>
            </div>
          </div>
        </div>
        <dl class="flex pt-4">
          <dt>{{ transactionDialogPriceTitle }}總金額:</dt>
          <dd class="px-4 text-lg font-bold">{{ transactionTotalPrice }}</dd>
        </dl>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
  import useStore from '@/store'
  import ItemDetail from '@/components/Item/Detail.vue'
  import StorehouseList from '@/components/Storehouse/List.vue'
  import Dialog from '@/components/Ui/Dialog.vue'
  import { getShopByKey, simplePayment } from '@/api/shop'

  const { fetchUserStorehouse, storehouse } = useStorehouse()
  const shop = ref({})
  const fetchShop = async () => {
    try {
      const { data } = await getShopByKey('officialShop')
      shop.value = data[0]
      currentItem.value = shop.value.items[0]
    } catch (error) {
      console.debug(error)
    }
  }
  const currentItem = ref({})
  const updateCurrentItem = (item) => {
    currentItem.value = item
  }

  const visibleTransactionDialog = ref(false)
  const isUserBuy = ref(false)
  const transactionCount = ref(1)
  const transactionDialogTitle = computed(() => isUserBuy.value ? '購買' : '販賣')
  const transactionDialogPriceTitle = computed(() => isUserBuy.value ? '支付' : '賺取')
  const transactionStock = computed(() => currentItem.value.stock - transactionCount.value)
  const transactionTotalPrice = computed(() => currentItem.value.price * transactionCount.value)
  
  const showBuyDialog = (item) => {
    visibleTransactionDialog.value = true
    isUserBuy.value = true
  }
  const showSellDialog = (item) => {
    visibleTransactionDialog.value = true
     isUserBuy.value = false
    updateCurrentItem(item)
  }
  const cancelTransaction = () => {
    transactionCount.value = 1
    visibleTransactionDialog.value = false
  }

  const store = useStore()
  const userInfo = computed(() => store.getUserInfo)
  const confirmTransaction = async () => {
    const body = {
      type: isUserBuy.value ? 'buy' : 'sell',
      shop: shop.value,
      user: storehouse.value,
      transactionItem: currentItem.value,
      transactionInfo: {
        itemId: currentItem.value.id,
        storehouseId:  isUserBuy.value ? storehouse.value.id : shop.value.id,
        count: transactionCount.value
      },
      userInfo: userInfo.value
    }
    try {
      const { status } = await simplePayment(body)
      if (status !== 200) throw `status ${status}`
      getItems()
      store.setUserInfo()
      visibleTransactionDialog.value = false
    } catch (error) {
      console.debug(error)
    }
  }
  const checkCount = () => { 
    transactionCount.value = transactionCount.value > currentItem.value.stock ? currentItem.value.stock : transactionCount.value
  }
  const getItems = async () => {
    await fetchShop()
    await fetchUserStorehouse('Rwe8WtiBqmMpn8a7wrAo')
    currentItem.value = storehouse.value.items[0]
  }
  onMounted(async () => {
    await getItems()
  }) 
</script>
