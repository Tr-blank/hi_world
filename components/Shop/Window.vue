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
              <div class="table-cell p-2 border-b border-gray-200">單價</div>
              <div class="table-cell p-2 border-b border-gray-200">數量(剩餘庫存: {{ transactionStock }})</div>
              <div class="table-cell p-2 border-b border-gray-200">金額</div>
            </div>
          </div>
          <div class="table-row-group">
            <div class="table-row">
              <div class="table-cell p-2 border-b border-gray-200">{{ currentItem.price }}</div>
              <div class="table-cell p-2 border-b border-gray-200">
                <input
                  v-model="transactionCount"
                  type="number"
                  min="1"
                  :max="currentItem.stock"
                  @keyup="checkCount"
                  class="border w-full px-2 py-1"
                >
              </div>
              <div class="table-cell p-2 border-b border-gray-200">{{ transactionTotalPrice }}</div>
            </div>
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
  import ItemDetail from '@/components/Item/Detail.vue'
  import StorehouseList from '@/components/Storehouse/List.vue'
  import Dialog from '@/components/Ui/Dialog.vue'
  import { getShopByKey } from '@/api/shop'

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
  const transactionDialogTitle = ref('')
  const transactionCount = ref(1)
  const transactionStock = computed(() => currentItem.value.stock - transactionCount.value )
  const transactionTotalPrice = computed(() => currentItem.value.price * transactionCount.value )

  const showBuyDialog = (item) => {
    visibleTransactionDialog.value = true
    transactionDialogTitle.value = '購買'
  }
  const showSellDialog = (item) => {
    visibleTransactionDialog.value = true
    transactionDialogTitle.value = '販賣'
    updateCurrentItem(item)
  }
  const cancelTransaction = () => {
    transactionCount.value = 0
    visibleTransactionDialog.value = false
  }
  const confirmTransaction = () => {
    console.log('確認購買')
  }
  const checkCount = () => { 
    transactionCount.value = transactionCount.value > currentItem.value.stock ? currentItem.value.stock : transactionCount.value
  }
  onMounted(async () => {
    await fetchShop()
    await fetchUserStorehouse('Rwe8WtiBqmMpn8a7wrAo')
    currentItem.value = storehouse.value.items[0]
  }) 
</script>
