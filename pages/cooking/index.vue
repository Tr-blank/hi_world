<template>
  <main class="flex items-center justify-center bg-gray-50 w-screen h-screen">
    <div v-show="isLoading">
      loading...
    </div>
    <div v-show="!isLoading">
      料理方式
      <ul>
        <li
          v-for="method in cookingMethodsList"
          :key="`cooking_method_${method.id}`"
        >
          {{ method.name }}
        </li>
      </ul>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { getCookingMethods } from '~/api/cooking.js'

const isLoading = ref(true)
const cookingMethodsList = ref([])

const fetchCookingMethods = async () => {
  try {
    const { data } = await getCookingMethods()
    cookingMethodsList.value = data
    isLoading.value = false
  } catch (error) {
    console.error('API Error', error)
  }
}
fetchCookingMethods()

</script>

<script>
// eslint-disable-next-line no-unreachable
export default {
  name: 'CookingPage'
}
</script>



<style lang="stylus" scoped>

</style>
