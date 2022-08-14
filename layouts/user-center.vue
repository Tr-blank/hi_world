<template>
  <div class="layout flex">
    <aside class="h-screen w-30 bg-blue-200 text-center flex flex-col justify-between">
      <header class="p-4">logo</header>
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
    <aside class="w-60 border-l">
      <header class="p-4">
        <div class="text-right">會員</div>
      </header>
    </aside>
  </div>
</template>

<script setup>
// your setup script
</script>
