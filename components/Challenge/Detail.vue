<template>
  <div class="">
    <form>
      <UiText v-model:value="formData.title" label="title" title="標題" />
      <select>

      </select>
    </form>
    <button class="border px-4 py-1 rounded mr-4" :disabled="isOriginalFormData" @click="updateChallenge">儲存</button>
    <button class="border px-4 py-1 rounded">刪除</button>
  </div>
</template>
<script setup> 
  import { ref, computed, watch } from 'vue' 
  import UiText from '@/components/Ui/Text.vue'
  const props = defineProps({
    form: Object
  })
  const { form } = toRefs(props)
  let formData = ref({})
  const isOriginalFormData = computed(() => JSON.stringify(formData.value) === JSON.stringify(form.value))
  const updateChallenge = () => {
    console.log('updateChallenge', formData.value)
  }
  watch(form, (form) => {
    formData.value = JSON.parse(JSON.stringify(form))
  })
</script>
<style lang="stylus" scoped>
  button:disabled {
    @apply bg-gray-200 cursor-not-allowed text-gray-500;
  }
</style>

