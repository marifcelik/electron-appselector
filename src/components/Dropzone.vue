<script setup>
/** @param {DragEvent} e  */
async function handleDrop(e) {
  const files = e.dataTransfer.files;

  for (const file of files) {
    window.api.uploadFile(file.path);
  }
}

const selectFile = window.api.selectFile;
</script>

<template>
    <div 
    id="dropzone"
    @click="selectFile()"
    @dragover.stop.prevent=""
    @drop.stop.prevent="handleDrop"
  >
    item upload
  </div>
</template>

<style scoped>
#dropzone {
  width: 37rem;
  height: 16rem;
  padding: 1.5rem;
  border: 2px dashed #d1d5db;
  cursor: pointer;
  border-radius: 10px;
  background-color: #1a1a1a;
}

#dropzone:hover {
  background-color: #2c2c2c;
}
</style>