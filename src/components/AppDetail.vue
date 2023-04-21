<script setup>
import { ref, watchEffect } from 'vue';
import store from '../store';

const app = ref(null)

watchEffect(() => {
  app.value = window.api.getAppById(store.appId)
})

const { runApp } = window.api
</script>

<template>
  <div id="detail-container">
    <div v-if="app" id="app-card">
      
      <button @click="runApp(app.command)">çalıştır</button>
    </div>
    <div v-else>
      <h1>hi tıpıt</h1>
    </div>
  </div>
</template>

<style>
#detail-container {
  width: 50%;
}
</style>