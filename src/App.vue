<script setup>
import { markRaw, onBeforeMount, ref } from 'vue';
import Dropzone from './components/Dropzone.vue';
import Modal from './components/Modal.vue';
import Apps from './components/Apps.vue';
import AppDetail from './components/AppDetail.vue';

const modalData = ref({
  show: false,
  element: undefined,
  type: undefined,
  id: null
})

const apps = ref([])

function modal(type, id = null) {
  const components = {
    dropzone: markRaw(Dropzone),
    app: markRaw(AppDetail),
  }

  modalData.value = {
    show: true,
    element: components[type],
    type,
    id
  }
}

onBeforeMount(() => {
  console.log(window.api.getApps());
})

function createApp() {
  const data = window.api.createApp(undefined, '/resim2', 'çalışıyor2')
  console.log(data)
}
</script>

<template>
  <button @click="modal('dropzone')">dropzone</button>
  <button @click="modal('app')">modal</button>
  <!-- <Dropzone /> -->
  <Teleport to="#modal">
    <Modal v-bind="modalData" @close="modalData.show = false" />
  </Teleport>
  <Apps @callModal="(id) => modal('app', id)" :data="apps" />
</template>
