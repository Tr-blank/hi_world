<template>
  <div class="w-full">
    <header class="p-4">
      <h1>挑戰清單</h1>
    </header>
    <div class="p-4">
      <div class="pb-4">
        <button type="button" class="border px-4 py-1 rounded" @click="createChallengeForm">新增</button>
      </div>
      <UiTable
        :thTitle="tableTitle"
        :tdData="challengeList"
        :hasViewDetail="true"
        @view-item-detail="viewChallengeDetail"
      />
      <div>
        <div>{{ currentChallengeId }}</div>
        <ChallengeForm
          v-model:form="currentChallengeData"
          :is-create-form="isCreateForm"
          @save-form-data="saveChallengeData"
          @delete-form-data="deleteChallenge"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import UiTable from '@/components/Ui/Table.vue'
  import ChallengeForm from '@/components/Challenge/Form.vue'
  import { challenge } from '@/composables/useApi'

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
      key: 'title',
      title: '標題',
      align: 'left'
    },
    {
      key: 'model',
      title: '模式',
      align: 'left'
    }
  ]
  const challengeList = ref([])
  const fetchChallengeList = async () => {
    try {
      const { data } = await challenge.getChallengeList()
      challengeList.value = data
    } catch (error) {
      console.debug(error)
    }
  }
  const currentChallengeId = ref('')
  const currentChallengeData = ref({})
  const isCreateForm = computed(() => currentChallengeId.value === 'newChallenge')
  const viewChallengeDetail = (challenge) => {
    currentChallengeData.value = challenge
    currentChallengeId.value = challenge.id
  }
   const createChallengeForm = () => {
    currentChallengeId.value = 'newChallenge'
    currentChallengeData.value = {
      title: '',
      description: '',
      isPublic: '0',
      tags: '非官方',
      model: '',
      remark: ''
    }
  }
  const saveChallengeData = async () => {
    try {
      if (isCreateForm.value) {
        console.log('add', currentChallengeData.value)
        const { data } = await challenge.addChallenge(currentChallengeData.value)
        currentChallengeId.value = currentChallengeId.value
        currentChallengeData.value = currentChallengeData.value
      } else {
        await challenge.updateChallenge(currentChallengeId.value, currentChallengeData.value)
      }
    } catch (error) {
      console.debug(error)
    } finally {
      fetchChallengeList()
    }
  }
  const deleteChallenge = async () => {
    try {
      await challenge.delChallenge(currentChallengeId.value)
    } catch (error) {
      console.debug(error)
    } finally {
      fetchChallengeList()
      createChallengeForm()
    }
  }
  onMounted(() => {
    fetchChallengeList()
  })
</script>
