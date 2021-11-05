<template>
  <main class="flex items-center justify-center bg-gray-50 w-screen h-screen">
    <div v-show="isLoading">loading...</div>
    <template v-if="!isLoading">
      <div
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
        v-show="!hasUserName"
      >
        <form class="text-center">
          <label for="name" class="block text-xl pb-4">你的名字?</label>
          <input
            id="name"
            v-model="loginForm.name"
            type="text"
            class="block bg-gray-200 py-2 px-4 mb-1 w-full rounded"
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
      <div
        class="
          user-page
          max-w-xl
          w-full
          border border-gray-200
          bg-white
          px-6
          py-10
          rounded
        "
        v-show="hasUserName"
      >
        <div class="pb-4">Hi {{ userName }}, 今天要做些甚麼呢?</div>
        <div class="pb-4">todolist</div>
        <div
          @click="logout"
          class="block bg-gray-800 text-white px-4 py-2 rounded cursor-pointer"
        >
          離開
        </div>
      </div>
    </template>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";

const isLoading = ref(true);
const loginForm = ref({
  name: "",
});
const isNameInputEmpty = ref(false);
const userName = ref("");
const hasUserName = computed(() => userName.value !== "");

const setUserProfile = () => {
  if (loginForm.value.name === "") {
    isNameInputEmpty.value = true;
    return;
  }
  isNameInputEmpty.value = false;
  userName.value = loginForm.value.name;
  localStorage.setItem("userName", userName.value);
  hasUserName.value = true;
};

const logout = () => {
  localStorage.removeItem("userName");
  userName.value = "";
  hasUserName.value = false;
};
</script>

<script>
export default {
  name: "Home",
  mounted() {
    this.userName = localStorage?.getItem("userName") || "";
    this.isLoading = false;
  },
};
</script>

<style lang="stylus" scoped>
.main
    border: 1px solid #ddd;
</style>
