<template>
  <div>
    <div class="flex w-full mb-4">
      <StorehouseList
        title="商店"
        :items="shop.items"
        @update-current-item="updateCurrentItem"
        class="w-1/2"
      />
      <div class="w-4" />
      <StorehouseList
        title="背包"
        :items="storehouse.items"
        @update-current-item="updateCurrentItem"
        class="w-1/2"
      />
    </div>
    <ItemDetail :item="currentItem" class="bg-gray-100 p-2 rounded" />
  </div>
</template>

<script setup>
  import ItemDetail from '@/components/Item/Detail.vue'
  import StorehouseList from '@/components/Storehouse/List.vue'
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
  const sellItems = ref([])
  const buyItems = ref([])
  onMounted(async () => {
    await fetchShop()
    await fetchUserStorehouse('Rwe8WtiBqmMpn8a7wrAo')
    currentItem.value = storehouse.value.items[0]
  }) 
</script>
