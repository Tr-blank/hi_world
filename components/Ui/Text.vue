<template>
  <label :for="label" class="block">
    <span class="block">{{ title }}</span>
    <input :id="label" type="text" v-model="textValue"  class="block px-4 py-1 border border-gray-500 rounded">
  </label>

</template>
<script setup>
  import { computed } from 'vue' 
  const props = defineProps({
    value: String,
    label: String,
    title: String
  })
  const emit = defineEmits(['update:value'])
  const textValue =  computed({
    get: () => props.value,
    set: val => {
      emit('update:value', val)
    }
  })
</script>
