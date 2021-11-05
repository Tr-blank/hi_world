<template>
  <main class="flex items-center justify-center bg-gray-50 w-screen h-screen">
    <div v-show="isLoading">loading...</div>
    <div v-show="!isLoading && hasUserName">
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
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const isLoading = ref(true);
const userName = ref("");
const hasUserName = computed(() => userName.value !== "");

const logout = () => {
  localStorage.removeItem("userName");
  userName.value = "";
  hasUserName.value = false;
  router.push({
    name: "index",
  });
};
</script>

<script>
export default {
  name: "Home",
  mounted() {
    this.userName = localStorage?.getItem("userName") || "";
    if (this.userName === "") {
      this.$router.push({
        name: "index",
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
