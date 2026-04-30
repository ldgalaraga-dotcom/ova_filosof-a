<template>
  <NuxtLayout>
    <transition name="page" mode="out-in">
      <NuxtPage />
    </transition>
  </NuxtLayout>
</template>

<style>
:root {
  --text-dark: #2C2416;
  --text-muted: #555555;
  --text-primary: #1B3A6B;
  --bg-card: #FFFFFF;
  --bg-light: #F8F4EC;
  --bg-hover: #FDF8EE;
}
.v-theme--dark, .dark-mode {
  --text-dark: #E8C97A;
  --text-muted: #B0A48C;
  --text-primary: #E8C97A;
  --bg-card: rgba(22, 18, 14, 0.92);
  --bg-light: rgba(201, 168, 76, 0.08);
  --bg-hover: rgba(255, 255, 255, 0.05);
}

/* Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
