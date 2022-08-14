<template>
  <div class="layout flex">
    <aside class="h-screen w-30 bg-blue-200 text-center flex flex-col justify-between">
      <header class="p-4"><nuxt-link to="/">logo</nuxt-link></header>
      <nav class="py-10">
        <a href="" class="block px-4 py-1">挑戰</a>
        <a href="" class="block px-4 py-1">系統</a>
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
        <div class="text-right">
          <div>{{ userProperty.name }}</div>
          <div class="text-sm">@{{ userProperty.account }}</div>
        </div>
      </header>
      <footer class="p-4">
        <div>遊戲幣: {{ userProperty.inGameMoney }}</div>
        <div>代幣: {{ userProperty.tokenMoney }}</div>
      </footer>
    </aside>
  </div>
</template>

<script setup>
  import { getUserPropertyByAccount } from '@/api/user'
  const localTestAccount = 'tiya12345'
  const userProperty = ref({})
  const fetchUserProperty = async () => {
    try {
      const { data } = await getUserPropertyByAccount(localTestAccount)
      userProperty.value = data[0]
    } catch (error) {
      console.debug(error)
    }
  }
  onMounted(async () => {
    await fetchUserProperty()
  })

</script>
