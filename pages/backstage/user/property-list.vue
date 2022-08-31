<template>
  <div class="w-full">
    <header class="p-4">
      <h1>使用者資產清單</h1>
    </header>
    <div class="p-4">
      <UiTable
        :thTitle="tableTitle"
        :tdData="list"
        :hasViewDetail="false"
      />
    </div>
  </div>
</template>

<script setup>
  import UiTable from '@/components/Ui/Table.vue'
  import { getUserPropertyList } from '@/api/user'

  definePageMeta({
    layout: "backstage",
  })

  const tableTitle = [
    {
      key: 'id',
      title: '編號',
      align: 'left'
    },
    {
      key: 'userId',
      title: '使用者ID',
      align: 'left'
    },
    {
      key: 'account',
      title: '帳號',
      align: 'left'
    },
    {
      key: 'name',
      title: '匿名',
      align: 'left'
    },
    {
      key: 'tokenMoney',
      title: '代幣',
      align: 'left'
    },
    {
      key: 'inGameMoney',
      title: '遊戲幣',
      align: 'left'
    }
  ]
  const list = ref([])
  const fetchUserPropertyList = async () => {
    try {
      const { data } = await getUserPropertyList()
      list.value = data
    } catch (error) {
      console.debug(error)
    }
  }
  onMounted(() => {
    fetchUserPropertyList()
  })
</script>
