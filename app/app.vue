<script setup lang="ts">
useHead({
  link: [
    { rel: 'icon', type: 'image/png', href: '/img/agora.png' },
    { rel: 'apple-touch-icon', href: '/img/agora.png' }
  ]
})
</script>

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
  --text-secondary: #5A5040;
  --text-link: #1B3A6B;
  --text-success: #5C6E2E;
  --bg-card: #FFFFFF;
  --bg-light: #F8F4EC;
  --bg-hover: #FDF8EE;
  --bg-subtle: #F5F0E8;
  --bg-warm: #FDFAF3;
  --bg-success: #D7EDD5;
  --bg-error: #F5D9D4;
  --border-success: #5C6E2E;
  --border-error: #8B3A2A;
}
.v-theme--dark, .dark-mode {
  --text-dark: #E8C97A;
  --text-muted: #B0A48C;
  --text-primary: #E8C97A;
  --text-secondary: #C9A84C;
  --text-link: #E8C97A;
  --text-success: #AED581;
  --bg-card: rgba(22, 18, 14, 0.92);
  --bg-light: rgba(201, 168, 76, 0.08);
  --bg-hover: rgba(255, 255, 255, 0.05);
  --bg-subtle: rgba(201, 168, 76, 0.06);
  --bg-warm: rgba(201, 168, 76, 0.04);
  --bg-success: rgba(139, 195, 74, 0.15);
  --bg-error: rgba(229, 57, 53, 0.15);
  --border-success: #8BC34A;
  --border-error: #EF5350;
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

/* ===== GLOBAL RESPONSIVE ===== */
@media (max-width: 600px) {
  /* Page titles */
  h1 {
    font-size: 1.3rem !important;
  }
  /* Reduce page padding on mobile */
  .v-container {
    padding: 12px !important;
  }
  /* Cards with large padding */
  .pa-5 {
    padding: 12px !important;
  }
  .pa-7 {
    padding: 16px !important;
  }
  .mb-5 {
    margin-bottom: 16px !important;
  }
}
</style>
