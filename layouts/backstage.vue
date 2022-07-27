<template>
  <main class="flex">
    <aside class="h-screen w-60 bg-blue-200 text-center flex flex-col justify-between">
      <header class="p-4">logo</header>
      <nav class="py-10">
        <template v-for="link in asideLinks" :key="link.key">
          <NuxtLink :to="link.path" class="block px-4 py-1">{{ link.name }}</NuxtLink>
          <div>
            <NuxtLink
              v-for="subLink in link.subLink"
              :key="subLink.key"
              :to="subLink.path"
              :class="{ 'bg-blue-100' : isCurrentLink(subLink.path) }"
              class="block px-4 py-1"
            >
              {{ subLink.name }}
            </NuxtLink>
          </div>
        </template>
      </nav>
      <footer class="p-4">footer</footer>
    </aside>
    <div class="w-full">
      <header class="p-4">
        <h1>{{ currentLink.name }}</h1>
      </header>
      <div class="p-4">
        <slot />
      </div>
    </div>
  </main>
</template>

<script setup>
const route = useRoute()
const currentLink = computed(() => allLink.find((link) => link.path === route.path ))
const isCurrentLink = (path) => route.path === path
const asideLinks = ref([
  {
    key: 'challenge',
    path: '/backstage/challenge',
    name: '挑戰',
    subLink: [
      {
        path: '/backstage/challenge',
        name: '挑戰清單',
        key: 'challengeList'
      },
      {
        path: '/backstage/challenge/model',
        name: '挑戰模式',
        key: 'challengeModel'
      },
      {
        path: '/backstage/challenge/tag',
        name: '挑戰標籤',
        key: 'challengeTag'
      }
    ]
  }
])
const allLink = asideLinks.value.reduce((previousValue, currentValue) => {
  return [
    ...previousValue,
    ...[currentValue],
    ...currentValue.subLink
  ]
}, [])
</script>
