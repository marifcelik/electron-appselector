<script setup>
import { onBeforeMount, ref } from 'vue';
import store from '../store';

const apps = ref([]);

onBeforeMount(() => {
  apps.value = window.api.getApps()
  console.log(apps)
})


</script>

<template>
  <div id="apps-container">
    <ul>
      <li v-for="app in apps" :key="app.id" @click="store.appId = app.id">
        <div class="img">
          <img :src="app.icon ? 'file://' + app.icon : '/default.png'" :alt="app.name + 'icon'"><br>
        </div>
        <div class="app-name">
          <h3>{{ app.name }}</h3>
        </div>
      </li>
      <li @click="store.modal = true">
        <div class="img">
          <img src="/plus.svg" alt="add">
        </div>
        <div class="app-name">
          <h3>Yeni uygulama</h3>
        </div>
      </li>
    </ul>
  </div>
</template>

<style>
#apps-container {
  width: 40%;
  height: 100%;
  margin: 4rem auto 0;
}

ul {
  width: 100%;
  height: calc(100vh - 8rem);
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 3rem;
  padding: 0.5rem;
  overflow-y: scroll;
  user-select: none;
}

ul::-webkit-scrollbar {
  width: 10px;
}

ul::-webkit-scrollbar-track:hover {
  background-color: #303030;
  transition: background-color 0.3s ease;
}
ul::-webkit-scrollbar-thumb:hover {
  background-color: #8c8c8c;
  border: 2px solid #1e1f22;
}

ul::-webkit-scrollbar-thumb {
  background-color: rgba(140, 140, 140, 0.5);
  border: 3px solid #1e1f22;
  border-radius: 10vw;
}


li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 9.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: 3px solid rebeccapurple;
  border-radius: 15px;
}

li:hover {
  background-color: #2b2c31;
}

li .img {
  width: 35%;
  display: flex;
  align-items: center;
  justify-content: center;
}

li .app-name {
  width: 65%;
}

li h2 {
  margin-left: 2rem;
  margin-right: auto;
  hyphens: auto;
}

img {
  width: 4rem;
  height: 4rem;
}
</style>
