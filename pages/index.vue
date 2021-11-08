<template>
  <main class="flex items-center justify-center bg-gray-50 w-screen h-screen">
    <div v-show="isLoading">loading...</div>
    <div
      v-show="!isLoading"
      class="
        login
        max-w-md
        w-full
        border border-gray-200
        bg-white
        px-6
        py-10
        rounded
      "
    >
      <form class="text-center">
        <label for="name" class="block text-xl pb-4">你的名字?</label>
        <input
          id="name"
          v-model="loginForm.name"
          type="text"
          class="block bg-gray-200 py-2 px-4 mb-1 w-full rounded"
          @keypress.enter="setUserProfile"
        />
        <div v-show="isNameInputEmpty" class="text-sm text-red-500">
          請輸入你的名字
        </div>
        <div
          @click="setUserProfile"
          class="
            block
            bg-gray-800
            text-white
            px-4
            py-2
            mt-3
            rounded
            cursor-pointer
          "
        >
          送出
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const isLoading = ref(true);
const isNameInputEmpty = ref(false);
const loginForm = ref({
  name: "",
});

const setUserProfile = () => {
  if (loginForm.value.name === "") {
    isNameInputEmpty.value = true;
    return;
  }
  isNameInputEmpty.value = false;
  localStorage.setItem("userName", loginForm.value.name);
  router.push({
    name: "user",
  });
};
</script>

<script>
export default {
  name: "Home",
  mounted() {
    if (localStorage?.getItem("userName")) {
      this.$router.push({
        name: "user",
      });
    }
    this.isLoading = false;
  },
};
</script>

<style lang="stylus" scoped>
.main
    border: 1px solid #ddd;
</style>
