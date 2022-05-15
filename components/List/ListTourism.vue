<template>
  <div>
    <div>
      <select
        v-model="city"
        @change="getTourism"
      >
        <option
          v-for="city in cityList"
          :key="`city_${city.value}`"
          :value="city.value"
        >
          {{ city.label }}
        </option>
      </select>
    </div>
    <div>
      <div
        v-for="tourism in tourismList"
        :key="`tourism_${tourism.ID}`"
      >
        {{ tourism.Name }}
      </div>
    </div>
  </div>
</template>

<script>
import { getTourismCity, getTourism } from '~~/api/tdx.js'
export default {
  name: 'ListTourism',
  data() {
    return {
      cityList: [],
      tourismList: null,
      city: ''
    }
  },
  async mounted() {
    this.isLoading = false
    await this.getTourismCity()
    this.getTourism()
  },
  methods: {
    async getTourismCity() {
      const { data } = await getTourismCity()
      this.cityList = data
      this.city = data[0].value
    },
    async getTourism() {
      const { data } = await getTourism({ city: this.city })
      this.tourismList = data
    }
  }
}
</script>