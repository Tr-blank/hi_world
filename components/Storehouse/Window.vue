<template>
  <div class="w-full border border-gray-200 bg-white p-4">
    <StorehouseList
      title="背包"
      :items="storehouse.items"
      @update-current-item="updateCurrentItem"
      class="w-full mb-4"
    />
    <ItemDetail :item="currentItem" class="p-4 bg-gray-100 rounded" />
    <div class="pt-4 text-right">
      <span>刪除</span>
    </div>
  </div>
</template>

<script setup>
  import ItemDetail from '@/components/Item/Detail.vue'
  import StorehouseList from '@/components/Storehouse/List.vue'
  const { fetchUserStorehouse, storehouse } = useStorehouse()
  const currentItem = ref({})
  const updateCurrentItem = (item) => {
    currentItem.value = item
  }
  onMounted(async () => {
    await fetchUserStorehouse('Rwe8WtiBqmMpn8a7wrAo')
    currentItem.value = storehouse.value.items[0]
  }) 
</script>
