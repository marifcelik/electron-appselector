<script setup>
import { onUnmounted, watch } from 'vue';
import store from '../store';

const { files } = store

function pathFilter(data) {
  console.log(data);
  return [...data]
    .map(file => ({ name: file.name, path: file.path }))
    .filter(value => files.findIndex(v => v.path === value.path) === -1);
}

/** @param {DragEvent} e  */
async function handleDrop(e) {
  files.push(...pathFilter(e.dataTransfer.files))
}

async function handleSelect() {
  files.push(...pathFilter(await window.api.selectFiles()))
}

// clear array
onUnmounted(() => files.length = 0)

watch([files], (value) => console.log(value))
</script>

<template>
  <div id="drop-container">
    <div id="dropzone" @click="handleSelect" @dragover.stop.prevent="" @drop.stop.prevent="handleDrop">
      <p>
        {{ files.length ? files.length + ' dosya yüklendi' : 'Dosya yüklemek için tıklayın ya da sürükleyin.' }}
      </p>
    </div>
    <br>
    <p id="files">{{ files.map(v => v.name).join(' - ') }}</p>
  </div>
</template>

<style scoped>
#drop-container {
  width: 90%;
  height: 70%;
  margin: 0 auto;
}

#dropzone {
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  border: 2px dashed #d1d5db;
  cursor: pointer;
  border-radius: 10px;
  background-color: #1a1a1a;
}

#dropzone:hover {
  background-color: #333333;
}

p#files {
  width: 100%;
  text-align: left;
  font-size: 14px;
  color: gray;
  hyphens: auto;
  word-break: break-all;
}
</style>