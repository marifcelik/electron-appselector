<script setup>
import { onUnmounted } from 'vue';
import store from '../store';
import Dropzone from './Dropzone.vue';

let timeOut;

function uploadApps() {
  /* REVIEW: i used like this because component.value.files object was coming as proxy
  and unref() method was not working  */
  window.api.uploadFiles(store.files.map(v => v.path));
  store.uploaded = 1;
  timeOut = setTimeout(() => {
    store.apps = window.api.getApps();
    store.modal = false;
  }, 100);
}

onUnmounted(() => {
  store.files = [];
  clearInterval(timeOut)
})
</script>

<template>
  <Transition name="modal">
    <div v-if="store.modal" id="modal-mask" @click="store.modal = false">
      <div id="modal-container" @click.stop="">
        <div id="modal-body">
          <Dropzone />
        </div>
        <div id="modal-footer">
          <div>
            <button @click="store.modal = false">İptal</button>
            <button @click="uploadApps">Kaydet</button>
          </div>
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
  width: min-content;
  height: min-content;
  margin: auto;
  padding: 2rem 0;
  background-color: #1e1f22;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  text-align: center;
}

#modal-body {
  margin: 0 2rem 2rem;
}

#modal-footer {
  display: flex;
  width: 85%;
  margin: 0 auto;
  justify-content: end;
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
