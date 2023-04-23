<script setup>
import { computed } from 'vue';
import store from '../store';

const app = computed(() => window.api.getAppById(store.selectedApp))

const { runApp } = window.api
</script>

<template>
  <div id="detail-container">
    <div v-if="app" id="app-card">
      <header>
        <img :src="app.icon ? 'file://' + app.icon : '/default.png'" :alt="app.name + ' icon'">
        <h2>{{ app.name }}</h2>
      </header>
      <div id="app-details">
        {{ app.details }}
      </div>
      <button id="exec" @click="runApp(app.command)">Çalıştır</button>
    </div>
    <div v-else>
      <h1>hi tıpıt</h1>
    </div>
  </div>
</template>

<style>
#detail-container {
  display: flex;
  width: 50%;
  height: 100%;
  align-items: center;
  justify-content: center;
}

#app-card {
  width: 75%;
  max-width: 35rem;
  height: 70%;
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  position: relative;
}

header {
  width: 100%;
}

header img {
  width: 7rem;
  height: 7rem;
}

header h2 {
  hyphens: auto;
  margin: 1rem 0;
}

#app-details {
  text-align: left;
}

#exec {
  position: absolute;
  right: 1.5rem;
  bottom: 2rem;
  font-size: large;
  background-color: rgba(0, 0, 0, 0.2);
  border: none;
  transition: 300ms linear background-color;
}

#exec:hover {
  background-color: rgb(209, 197, 197);
  color: #000;
  mix-blend-mode: screen;
}
</style>