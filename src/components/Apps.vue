<script setup>
import { onBeforeMount } from 'vue';
import store from '../store';

onBeforeMount(() => store.apps = window.api.getApps())
</script>

<template>
  <div id="apps-container">
    <ul>
      <li v-for="app in store.apps" :key="app.id" @click="store.selectedApp = app.id">
        <img class="icon" :src="app.icon ? 'file://' + app.icon : '/default.png'" :alt="app.name + ' icon'"><br>
        <div class="app-name">
          <h3>{{ app.name }}</h3>
        </div>
      </li>
      <li @click="store.modal = true">
        <img class="icon" src="/plus.svg" alt="add">
        <div class="app-name">
          <h3>Yeni uygulama</h3>
        </div>
      </li>
    </ul>
  </div>
</template>

<style>
#apps-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 50%;
}

ul {
  width: 80%;
  height: 80%;
  margin: 0 auto;
  padding: 0.5rem;
  overflow-y: scroll;
  user-select: none;
}

ul::-webkit-scrollbar {
  width: 7px;
}

ul::-webkit-scrollbar-track:hover {
  background-color: rgba(48, 48, 48, 0.5);
  border-radius: 10vw;
}

ul::-webkit-scrollbar-thumb:hover {
  background-color: #ada1ad;
}

ul::-webkit-scrollbar-thumb {
  background-color: rgba(204, 204, 204, 0.5);
  border-radius: 10vw;
}

li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 9.5rem;
  margin-bottom: 2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: 3px solid rebeccapurple;
  border-radius: 15px;
}

li:hover {
  background-color: rgba(43, 44, 49, 0.3);
}

li img.icon {
  width: 4rem;
  height: 4rem;
  margin: 0 auto;
}

li .app-name {
  width: 65%;
}

li h2 {
  margin-left: 2rem;
  margin-right: auto;
  hyphens: auto;
}
</style>
