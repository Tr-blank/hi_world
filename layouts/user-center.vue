<template>
  <div class="layout flex">
    <aside class="h-screen w-30 bg-blue-200 text-center flex flex-col justify-between">
      <header class="p-4"><nuxt-link to="/">logo</nuxt-link></header>
      <nav class="py-10">
        <nuxt-link to="/user" class="block px-4 py-1">挑戰</nuxt-link>
        <nuxt-link to="/user/shop" class="block px-4 py-1">商店</nuxt-link>
      </nav>
      <footer class="p-4">footer</footer>
    </aside>
    <div class="w-full">
      <header class="p-4">
        <nav>子選項</nav>
      </header>
      <slot />
    </div>
    <aside class="w-60 border-l flex flex-col justify-between">
      <header class="p-4">
        <div class="flex">
          <div class="w-10 h-10 bg-gray-400 rounded-full"></div>
          <div class="pl-2">
            <div>{{ userProperty.name }}</div>
            <div class="text-sm">@{{ userProperty.account }}</div>
          </div>
        </div>
        <div>
          <div>遊戲幣: {{ userProperty.inGameMoney }}</div>
          <div>代幣: {{ userProperty.tokenMoney }}</div>
        </div>
      </header>
      <footer class="p-4">
        <nuxt-link to="/user/backpack">背包</nuxt-link>
      </footer>
    </aside>
  </div>
</template>

<script setup>
  import useStore from '@/store'
  const store = useStore()
  const userProperty = computed(() => store.getUserInfo)
  store.setUserInfo()
</script>
