<template>
  <main class="flex items-center justify-center bg-gray-50 w-screen h-screen">
    <div v-show="isLoading">
      loading...
    </div>
    <div
      v-show="!isLoading"
      class="flex"
    >
      <form class="py-2 px-4">
        <div class="flex py-2 items-center">
          <label class="w-36">
            挑戰名稱
          </label>
          <input
            type="text"
            class="block bg-gray-200 py-2 px-4 w-full rounded"
          >
        </div>
        <div class="flex py-2 items-center">
          <div class="w-36">
            挑戰天數
          </div>
          <div class="flex flex-wrap">
            <label
              for="data"
              class="w-1/2"
            >
              <input
                id="data"
                type="radio"
                name="tastDate"
                value="data"
              >
              單日
            </label>
            <label
              for="period"
              class="w-1/2"
            >
              <input
                id="period"
                type="radio"
                name="tastDate"
                value="period"
              >
              多日
            </label>
            <input
              type="date"
              class="block bg-gray-200 py-2 px-4 w-full rounded"
            >
            <input
              type="date"
              class="block bg-gray-200 py-2 px-4 w-full rounded"
            >
          </div>
        </div>
        <div class="flex py-2 items-center">
          <label class="w-36">
            完成獎金
          </label>
          <input
            type="text"
            class="block bg-gray-200 py-2 px-4 w-full rounded"
          >
        </div>
        <div class="flex py-2 items-center">
          <label class="w-36">
            挑戰類型
          </label>
          <select
            name="taskType"
            class="block bg-gray-200 py-2 px-4 w-full rounded"
          >
            <option value="觀光景點">
              觀光景點
            </option>
            <option value="觀光景點">
              其他
            </option>
          </select>
        </div>
      </form>
      <div>景點清單</div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { fetchCommonData } from '~/api/ptx.js'

const isLoading = ref(true)

</script>

<script>
export default {
  name: 'TaskList',
  async mounted() {
    this.isLoading = false
    const data =  await fetchCommonData()
    console.log(data)
  }
}
</script>

<style lang="stylus" scoped>

</style>
