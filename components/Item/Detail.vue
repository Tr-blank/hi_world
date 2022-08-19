<template>
  <div>
    <template v-if="item">
      <div>名稱:{{ item.name }}</div>
      <!-- <div>類型:{{ item.tag }}</div> -->
      <div>價格:{{ item.price }}</div>
    </template>
    <template v-else>空背包</template>
  </div>
</template>

<script setup>
  const props = defineProps({
    item: Object
  })
</script>
