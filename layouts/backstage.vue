<template>
  <div class="flex">
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
    <slot />
  </div>
</template>

<script setup>
const route = useRoute()
const currentLink = computed(() => allLink.find((link) => link.path === route.path ))
const isCurrentLink = (path) => route.path === path
const asideLinks = ref([
  {
    path: '/backstage',
    name: '儀錶板',
    key: 'backstage'
  },
  {
    key: 'user',
    path: '/backstage/user/property-list',
    name: '使用者',
    subLink: [
      {
        path: '/backstage/user/property-list',
        name: '使用者資產清單',
        key: 'userPropertyList'
      }
    ]
  },
  {
    key: 'challenge',
    path: '/backstage/challenge/list',
    name: '挑戰',
    subLink: [
      {
        path: '/backstage/challenge/model',
        name: '挑戰模式',
        key: 'challengeModel'
      },
      {
        path: '/backstage/challenge/tag',
        name: '挑戰標籤',
        key: 'challengeTag'
      },
      {
        path: '/backstage/challenge/list',
        name: '挑戰清單',
        key: 'challengeList'
      }
    ]
  },
  {
    key: 'item',
    path: '/backstage/item/list',
    name: '道具',
    subLink: [
      {
        path: '/backstage/item/tag',
        name: '道具標籤',
        key: 'itemTag'
      },
      {
        path: '/backstage/item/list',
        name: '道具清單',
        key: 'itemList'
      }
    ]
  },
  {
    key: 'shop',
    path: '/backstage/shop/list',
    name: '商店',
    subLink: [
      {
        path: '/backstage/shop/tag',
        name: '商店標籤',
        key: 'shopTag'
      },
      {
        path: '/backstage/shop/list',
        name: '商店清單',
        key: 'shopList'
      }
    ]
  }
])
const allLink = asideLinks.value.reduce((previousValue, currentValue) => {
  return [
    ...previousValue,
    ...[currentValue],
    ...currentValue.subLink ? [currentValue.subLink] : []
  ]
}, [])
</script>
