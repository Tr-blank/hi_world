<template>
  <div class="table w-full p-4 border border-gray-200">
    <div class="table-header-group">
      <div class="table-row">
        <div v-for="th in thTitle" :key="th.key" class="table-cell p-2 border-b border-gray-500">{{ th.title }}</div>
        <div v-if="hasViewDetail"  class="table-cell p-2 border-b border-gray-500">編輯</div>
      </div>
    </div>
    <div class="table-row-group">
      <div v-for="tr in trData" :key="tr.id" class="table-row">
        <div v-for="td in tr.tdData" :key="td.key" class="table-cell p-2 border-b border-gray-200">{{ td }}</div>
        <div v-if="hasViewDetail" class="table-cell p-2 border-b border-gray-200">
          <button type="button" @click="clickItemDetail(tr.id)">查看</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { computed } from 'vue' 
  const props = defineProps({
    thTitle: Array,
    tdData: Array,
    hasViewDetail: Boolean
  })
  const emit = defineEmits(['view-item-detail'])
  const { thTitle, tdData, hasViewDetail } = toRefs(props)
  const thCount = computed(() => thTitle.value.length)
  const trData = computed(() => {
    return tdData.value.map((td) => {
      return {
        id: td.id,
        tdData: thTitle.value.map((th) => td[th.key] ? td[th.key] : null).filter(td => td)
      }
    })
  })
  const clickItemDetail = (itemId) => {
    if (!hasViewDetail.value) return
    emit('view-item-detail', tdData.value.find((td) => td.id === itemId))
  }
</script>
