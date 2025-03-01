<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>Project {{ route.params?.slug }}</div>
</template>
