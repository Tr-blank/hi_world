<template>
  <main class="flex items-center justify-center bg-gray-50 w-screen h-screen">
    <div v-show="isLoading">loading...</div>
    <div
      v-show="!isLoading && hasUserName"
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
      <div class="pb-4">
        <div
          v-for="(thing, index) in thingList"
          :key="`toDoThing${index}`"
          class="
            flex
            items-center
            justify-between
            border border-gray-200
            rounded
            pl-4
            pr-1
            py-2
            mb-4
          "
        >
          <span>{{ thing }}</span>
          <span
            @click="deleteThing(index)"
            class="text-gray-500 text-xs hover:text-gray-700 cursor-pointer"
            >刪除</span
          >
        </div>
        <div class="flex">
          <input
            v-model="newThing"
            type="text"
            class="block bg-gray-200 py-2 px-4 w-full rounded"
            @keypress.enter="addThing"
          />
          <div
            @click="addThing"
            class="
              block
              bg-gray-800
              text-white
              px-4
              py-2
              rounded
              cursor-pointer
              w-24
              text-center
            "
          >
            新增
          </div>
        </div>
      </div>
      <div
        @click="logout"
        class="block bg-gray-800 text-white px-4 py-2 rounded cursor-pointer"
      >
        離開
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

const newThing = ref("");
const thingList = ref([]);
const addThing = () => {
  thingList.value.push(newThing.value);
  localStorage.setItem("thingList", thingList.value.toString());
  newThing.value = "";
};
const deleteThing = (index) => {
  thingList.value.splice(index, 1);
  localStorage.setItem("thingList", thingList.value.toString());
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
    const thingListString = localStorage?.getItem("thingList") || "";
    this.thingList = thingListString.split(",");
    this.isLoading = false;
  },
};
</script>

<style lang="stylus" scoped>
.main
    border: 1px solid #ddd;
</style>
