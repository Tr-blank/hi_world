<template>
  <main class="bg-gray-50 w-screen h-screen">
    <div
      v-show="isLoading"
      class="w-full h-full flex items-center justify-center"
    >
      <span>loading...</span>
    </div>
    <div
      v-show="!isLoading"
      class="relative w-full h-full"
    >
      <div class="p-4">
        <span>點及查看食譜</span>
        <ul>
          <li
            v-for="recipe in userRecipeList"
            :key="`userRecipe${recipe.id}`"
            class=""
          >
            <div class="text-xl">
              {{ recipe.name }}
            </div>
            <div>
              <div>所有食材</div>
              <div
                v-for="item in recipe.ingredients_all"
                :key="`recipe${recipe.id}Item${item.id}`"
              >
                <span>{{ item.name }}</span>
                <span>{{ item.count }}</span>
              </div>
            </div>
            <div>
              <div>步驟</div>
              <div
                v-for="(step, index) in recipe.steps"
                :key="`recipe${recipe.id}steps${index}`"
              >
                <span>{{ step.method.name }}</span>
                <span>{{ step.duration_time }}</span>
              </div>
            </div>
          </li>
        </ul>
        <!-- <div>{{ userRecipeList }}</div> -->
      </div>
      <div class="absolute left-0 bottom-0 w-full">
        <div>倉庫</div>
        <ul>
          <li
            v-for="item in userStorehouse"
            :key="`userStoreItem${item.id}`"
          >
            <span>{{ item.name }}</span>
            <span>{{ item.count }}</span>
          </li>
        </ul>
      </div>
      <div class="absolute right-0 top-0">
        料理方式
        <ul>
          <li
            v-for="method in methodsList"
            :key="`cooking_method_${method.id}`"
          >
            {{ method.name }}
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { getUserCookingData, getCookingMethods } from '~/api/cooking.js'

const isLoading = ref(true)
const methodsList = ref([])
const userRecipeList = ref([])
const userStorehouse = ref([])

const fetchUserCookingData = async () => {
  try {
    const { data } = await getUserCookingData()
    userRecipeList.value = data.recipe_list
    userStorehouse.value = data.storehouse
  } catch (error) {
    console.error('API Error', error)
  }
}

const fetchCookingMethods = async () => {
  try {
    const { data } = await getCookingMethods()
    methodsList.value = data
  } catch (error) {
    console.error('API Error', error)
  }
}

const pageInit = async () => {
  await fetchUserCookingData()
  await fetchCookingMethods()
  isLoading.value = false
}
pageInit()

</script>

<script>
// eslint-disable-next-line no-unreachable
export default {
  name: 'CookingPage'
}
</script>



<style lang="stylus" scoped>

</style>
