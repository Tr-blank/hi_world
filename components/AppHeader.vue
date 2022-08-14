<template>
  <header class="p-4 bg-gray-100">
    <div class="max-w-7xl w-full mx-auto flex">
      <h1><nuxt-link to="/">logo</nuxt-link></h1>
      <nav class="flex px-4">
        <nuxt-link to="/challenge">挑戰</nuxt-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
}
</script>