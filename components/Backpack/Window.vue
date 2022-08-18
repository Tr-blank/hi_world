<template>
  <div class="flex w-full border border-gray-200 bg-white">
    <div class="p-4 border-r border-gary-200 flex-[0_0_300px]">
      <template v-if="currentItem">
        <div>名稱:{{ currentItem.name }}</div>
        <!-- <div>類型:{{ currentItem.tag }}</div> -->
        <div>價格:{{ currentItem.price }}</div>
      </template>
      <template v-else>空背包</template>
    </div>
    <div class="flex-[1_1_100%] p-4">
      <BackpackList
        :items="backpack.items"
        @update-current-item="updateCurrentItem"
        class="border-b"
      />
      <div class="pt-4">
        <span>整理</span>
        <span>刪除</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  import BackpackList from '@/components/Backpack/List.vue'
  import { getStorehouseByUserId } from '@/api/storehouse'
  const backpack = ref({})
  const currentItem = ref({})
  const fetchUserBackpack = async () => {
    try {
      const { data } = await getStorehouseByUserId('Rwe8WtiBqmMpn8a7wrAo')
      backpack.value = data[0]
      currentItem.value = backpack.value.items[0]
    } catch (error) {
      console.debug(error)
    }
  }
  const updateCurrentItem = (item) => {
    currentItem.value = item
  }
  onMounted(async () => {
    await fetchUserBackpack()
  }) 
</script>
