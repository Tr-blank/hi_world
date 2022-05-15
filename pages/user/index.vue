<template>
  <main class="flex items-center justify-center bg-gray-50 w-screen h-screen">
    <div v-show="isLoading">
      loading......
    </div>
    <div
      v-show="!isLoading && hasUserName"
      class="user-page max-w-xl w-full border border-gray-200 bg-white px-6 py-10 rounded">
      <div class="flex justify-between">
        <div class="pb-4">
          {{ userName }}: ${{ wallet }}元
        </div>
        <a href="/task">任務清單</a>
      </div>
      <div class="pb-4">
        Hi, 今天要做些甚麼呢?
      </div>
      <div class="pb-4">
        <div
          v-for="(thing, index) in thingList"
          :key="`toDoThing${thing}`"
          class=" flex items-center justify-between border border-gray-200 rounded pl-4 pr-1 py-2 mb-4 text-left"
        >
          <div class="flex items-center w-16">
            <input
              :id="`thing${index}`"
              type="checkbox"
              class="thing__checkbox"
            />
            <span
              class="thing__double-checkbox cursor-pointer"
              @click="checkThing(index)"
            >完成</span>
          </div>
          <span>{{ thing }}</span>
          <span
            class="text-gray-500 text-xs hover:text-gray-700 cursor-pointer"
            @click="deleteThing(index)"
          >刪除</span>
        </div>
        <div class="flex">
          <input
            v-model="newThing"
            type="text"
            class="block bg-gray-200 py-2 px-4 w-full rounded"
            @keypress.enter="addThing"
          />
          <div
            class=" block bg-gray-800 text-white px-4 py-2 rounded cursor-pointer w-24 text-center"
            @click="addThing"
          >
            新增
          </div>
        </div>
      </div>
      <div
        class="block bg-gray-800 text-white px-4 py-2 rounded cursor-pointer"
        @click="logout"
      >
        離開
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoading = ref(true)
const userName = ref('')
const hasUserName = computed(() => userName.value !== '')

const logout = () => {
  localStorage.removeItem('userName')
  userName.value = ''
  router.push({
    name: 'index'
  })
}

const wallet = ref(0)
const newThing = ref('')
const thingList = ref([])
const completeThingList = ref([])

const addThing = () => {
  if (newThing.value === '') return
  thingList.value.push(newThing.value)
  localStorage.setItem('thingList', thingList.value.toString())
  newThing.value = ''
}

const deleteThing = (index) => {
  thingList.value.splice(index, 1)
  localStorage.setItem('thingList', thingList.value.toString())
}

const dailyTaskReward = () => {
  const completeThingCount = completeThingList.value.length
  let reward = 0
  if (completeThingCount <= 10) {
    reward += 10
    localStorage.setItem('wallet', wallet.value)
  }
  switch (completeThingCount) {
  case 3:
    reward += 10
    break
  case 6:
    reward += 20
    break
  case 10:
    reward += 30
    break
  }
  wallet.value += reward
  localStorage.setItem('wallet', wallet.value)
}

const checkThing = (index) => {
  completeThingList.value.push(thingList.value[index])
  dailyTaskReward()
  localStorage.setItem('completeThingList', completeThingList.value.toString())
  deleteThing(index)
}
</script>

<script>
// import AppHeader from "@/components/AppHeader";

export default {
  name: 'HomeIndex',
  // components: {
  //   AppHeader
  // },
  mounted() {
    this.userName = localStorage?.getItem('userName') || ''
    if (this.userName === '') {
      this.$router.push({
        name: 'index'
      })
    }
    const walletString = localStorage?.getItem('wallet') || '0'
    this.wallet = parseInt(walletString, 10)
    const thingListString = localStorage?.getItem('thingList') || ''
    this.thingList = thingListString ? thingListString.split(',') : []
    const completeThingListString =
      localStorage?.getItem('completeThingList') || ''
    this.completeThingList = completeThingListString
      ? completeThingListString.split(',')
      : []
    this.isLoading = false
  }
}
</script>
