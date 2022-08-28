<template>
  <teleport to="body">
    <div v-show="visible" class="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-[10]">
      <div class="dialog__overlay absolute top-0 left-0 w-screen h-screen z-[1] cursor-pointer bg-white opacity-60" @click="cancel" />
      <div class="max-w-xs w-full border relative shadow-md z-[5]">
        <header class="px-4 py-2 border-b flex justify-between">
          <span>{{ title }}</span>
          <slot name="title"/>
          <span class="cursor-pointer" @click="cancel">X</span>
        </header>
        <main class="p-4">
          <div>{{ content }}</div>
          <slot name="content"/>
        </main>
        <footer class="p-4">
          <button type="button" class="border px-4 py-1 rounded mr-4" @click="confirm">確認</button>
          <button type="button" class="border px-4 py-1 rounded mr-4" @click="cancel">取消</button>
          <slot name="footer"/>
        </footer>
      </div>
    </div>
  </teleport>
</template>

<script setup>
  const props = defineProps({
    visible: Boolean,
    title: String,
    content: String
  })
  const emit = defineEmits(['confirm', 'cancel'])
  const confirm = () => {
    emit('confirm')
  }
  const cancel = () => {
    emit('cancel')
  }
</script>
