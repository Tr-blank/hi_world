<template>
  <ul class="border border-gray-200 p-2 cursor-pointer flex rounded">
    <li
      v-for="item in items"
      @click="updateCurrentItem(item)"
      @mouseenter="updateCurrentItem(item)"
      class="border border-gray-200 p-1 rounded bg-gray-100"
    >
      <div>{{ item.name }}<span>{{ item.stock }}</span></div>
    </li>
  </ul>
</template>
<script setup>
  const props = defineProps({
    items: Array
  })
  const emit = defineEmits(['update-current-item'])
  const updateCurrentItem = (item) => {
    emit('update-current-item', item)
  }

</script>
