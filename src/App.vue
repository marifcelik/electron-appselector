<script setup>
import Modal from './components/Modal.vue';
import Apps from './components/Apps.vue';
import AppDetail from './components/AppDetail.vue';
</script>

<template>
  <Teleport to="#modal">
    <Modal />
  </Teleport>
  <main>
    <Apps />
    <AppDetail />
  </main>
</template>

<style>
main {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-evenly;
  align-items: center;
}
</style>
