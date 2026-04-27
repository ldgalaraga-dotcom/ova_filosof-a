<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const ruta = useRoute()

if (ruta.path === '/') {
  navigateTo('/contenido')
}
</script>
