<template>
  <div class="layout">
    <AppHeader />
    <slot />
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";

export default {
  layout: "custom",
  components: {
    AppHeader
  }
};
</script>

<script setup>
// your setup script
</script>
