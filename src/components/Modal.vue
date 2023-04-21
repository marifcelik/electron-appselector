<script setup>
import { onUnmounted } from 'vue';
import store from '../store';
import Dropzone from './Dropzone.vue';

function uploadApps() {
  /* REVIEW: i used like this because component.value.files object was coming as proxy
  and unref() method was not working  */
  const files = JSON.parse(JSON.stringify(store.files))
  window.api.uploadFiles(files.map(v => v.path))
}

onUnmounted(() => store.files = [])
</script>

<template>
  <Transition name="modal">
    <div v-if="store.modal" id="modal-mask" @click="store.modal = false">
      <div id="modal-container" @click.stop="">
        <div id="modal-body">
          <Dropzone />
        </div>
        <div id="modal-footer">
          <button @click="store.modal = false">İptal</button>
          <button @click="uploadApps">Kaydet</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
#modal-mask {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

#modal-container {
  width: 45rem;
  height: 25rem;
  margin: auto;
  padding: 30px 20px;
  background-color: #1e1f22;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

#modal-body {
  width: 90%;
  height: 90%;
  margin: 0 auto;
  text-align: center;
}

#modal-footer {
  display: flex;
  width: 25%;
  margin-left: auto;
  margin-right: 3rem;
}

button {
  margin-left: 10px;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from #modal-container,
.modal-leave-to #modal-container {
  transform: translateY(-30px)
}
</style>
