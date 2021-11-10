<template>
  <div class="{{kebabCase name}}">

  </div>
</template>

<script>
export default {
  name: '{{pascalCase name}}',
  data() {
    return {
      text: ''
    }
  },
  computed: {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.{{ kebabCase name }} {
}
</style>
