<template>
  <main class="flex items-center justify-center bg-gray-50 w-screen h-screen">
    <div v-show="isLoading">
      loading...
    </div>
    <div v-show="!isLoading">
      task list
      <a href="/task/create">創建任務</a>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const isLoading = ref(true)

</script>

<script>
export default {
  name: 'TaskList',
  mounted() {this.isLoading = false
  },
}
</script>

<style lang="stylus" scoped>

</style>
