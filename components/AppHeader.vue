<template>
  <header class="p-4 bg-gray-100">
    <div class="max-w-7xl w-full mx-auto flex justify-between">
      <div class="flex">
        <h1><nuxt-link to="/">logo</nuxt-link></h1>
        <nav class="flex px-4">
          <nuxt-link to="/challenge">挑戰</nuxt-link>
        </nav>
      </div>
      <div>
        <nuxt-link to="/user">登入</nuxt-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
}
</script>