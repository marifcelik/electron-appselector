<script setup>
import store from '../store';
</script>

<template>
  <main>
    <ul>
      <li v-for="app, i in store.apps" :key="i">
        <img :src="app.icon" :alt="app.name + 'icon'"><br>
        <p>{{ app.name }}</p>
      </li>
      <li>
        <img src="/plus.svg" alt="add">
      </li>
    </ul>
  </main>
</template>

<style scoped>
main {
  width: 75%;
  margin: 5rem auto 0;
}

ul {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 3rem;
}

ul li {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 7rem;
  height: 7rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

ul li:hover {
  background-color: #2b2c31;
}

li:last-child img {
  width: 4rem;
  height: 4rem;
}

img {
  width: 3rem;
  height: 3rem;
}
</style>