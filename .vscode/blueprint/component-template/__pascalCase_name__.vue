<template>
  <div class="{{kebabCase name}}" />
</template>

<script>
export default {
  name: '{{pascalCase name}}',
  props: {
    data: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

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
