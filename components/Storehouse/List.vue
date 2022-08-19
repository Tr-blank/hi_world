<template>
  <div>
    <div class="text-center text-lg pb-4">{{ title }}</div>
    <ul class="w-full">
      <li class="flex py-1 px-2 border-b border-gray-200">
        <span class="w-3/5">名稱</span>
        <span class="w-1/5">數量</span>
        <span class="w-1/5">價格</span>
      </li>
      <li
        v-for="item in items"
        @click="updateCurrentItem(item)"
        @mouseenter="updateCurrentItem(item)"
        @dblclick="selectItem(item)"
        class=" hover:bg-gray-100 py-1 px-2 flex"
      >
        <div class="w-3/5">
          <i class="w-4 h-4 inline-block bg-gray-400 mr-2 align-middle" />
          <span class="align-middle">{{ item.name }}</span>
        </div>
        <span class="w-1/5">{{ item.stock }}</span>
        <span class="w-1/5">{{ item.price }}</span>
      </li>
    </ul>
  </div>
</template>
<script setup>
  const props = defineProps({
    items: Array,
    title: String
  })
  const emit = defineEmits(['update-current-item'])
  const updateCurrentItem = (item) => {
    emit('update-current-item', item)
  }
  const selectItem = (item) => {
    console.log(item)
  }

</script>
