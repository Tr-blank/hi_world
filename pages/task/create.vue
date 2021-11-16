<template>
  <main class="">
    <div v-show="isLoading">
      loading...
    </div>
    <div
      v-show="!isLoading"
      class="flex"
    >
      <form class="py-2 px-4 w-1/3 bg-gray-50">
        <h1 class="text-xl text-center py-4">
          建立新挑戰
        </h1>
        <div class="flex py-2 items-center">
          <label class="w-2/5">
            名稱
          </label>
          <div class="w-3/5">
            <input
              v-model="createTaskForm.name"
              type="text"
              class="block bg-gray-200 py-2 px-4 rounded w-full"
            >
          </div>
        </div>
        <div class="flex py-2 items-center">
          <div class="w-2/5">
            時間單位
          </div>
          <div class="flex w-3/5">
            <label
              for="data"
              class="block"
            >
              <input
                id="data"
                v-model="createTaskForm.periodType"
                type="radio"
                name="periodType"
                value="byTime"
              >
              小時
            </label>
            <label
              for="period"
              class="block"
            >
              <input
                id="period"
                v-model="createTaskForm.periodType"
                type="radio"
                name="periodType"
                value="byDay"
              >
              天數
            </label>
          </div>
        </div>
        <div class="flex py-2 items-center">
          <div class="w-2/5">
            期間
          </div>
          <div
            v-show="createTaskForm.periodType === 'byTime'"
            class="flex flex-wrap w-3/5"
          >
            <input
              v-model="createTaskForm.timeStart"
              type="time"
              class="block bg-gray-200 py-2 px-4 w-full rounded"
            >
            <template v-if="createTaskForm.hasEndTime">
              <span>~</span>
              <input
                v-model="createTaskForm.timeEnd"
                type="time"
                class="block bg-gray-200 py-2 px-4 w-full rounded"
              >
            </template>
            <label class="block w-full"><input
              v-model="createTaskForm.hasEndTime"
              type="checkbox"
            />有結束時間</label>
          </div>
          <div
            v-show="createTaskForm.periodType === 'byDay'"
            class="flex flex-wrap w-3/5"
          >
            <input
              v-model="createTaskForm.dateStart"
              type="date"
              class="block bg-gray-200 py-2 px-4 w-full rounded"
            >
            <template v-if="createTaskForm.hasEndDay">
              <span>~</span>
              <input
                v-model="createTaskForm.dateEnd"
                type="date"
                class="block bg-gray-200 py-2 px-4 w-full rounded"
              >
            </template>
            <label class="block w-full"><input
              v-model="createTaskForm.hasEndDay"
              type="checkbox"
            />有結束日期</label>
          </div>
        </div>
        <div class="flex py-2 items-center">
          <label class="w-2/5">
            完成獎金
          </label>
          <div class="w-3/5">
            <input
              v-model="createTaskForm.reward"
              type="number"
              class="block bg-gray-200 py-2 px-4 w-full rounded"
            >
          </div>
        </div>
        <div class="flex py-2 items-center">
          <label class="w-2/5">
            挑戰類型
          </label>
          <div class="w-3/5">
            <select
              v-model="createTaskForm.type"
              name="taskType"
              class="block bg-gray-200 py-2 px-4 w-full rounded"
            >
              <option value="tourism">
                觀光景點
              </option>
              <option value="other">
                其他
              </option>
            </select>
          </div>
        </div>
        <div
          class="block bg-gray-800 text-white px-4 py-2 rounded cursor-pointer"
          @click="createTask"
        >
          建立
        </div>
      </form>
      <div v-show="createTaskForm.type === 'tourism'">
        景點清單
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { getTourismCity, getTourism } from '~~/api/tdx.js'

const isLoading = ref(true)
const createTaskForm = reactive({
  name: '',
  periodType: 'byTime',
  dateStart: '',
  dateEnd: '',
  hasEndDay: false,
  timeStart: '',
  timeEnd: '',
  hasEndTime: false,
  type: '',
  reward: ''

})
const createTask = () => {
  console.log('create task',createTaskForm)
}

</script>

<script>
export default {
  name: 'TaskList',
  async mounted() {
    this.isLoading = false
    const data =  await getTourismCity()
    console.log(data)
    const tourism =  await getTourism({ city: 'NewTaipei' })
    console.log(tourism)
  }
}
</script>

<style lang="stylus" scoped>

</style>
