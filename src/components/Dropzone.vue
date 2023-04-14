<script setup>
/** @param {DragEvent} e  */
async function handleDrop(e) {
  const files = e.dataTransfer.files;

  const paths = [...files].map((file) => file.path)

  window.api.uploadFiles(paths);
}

const selectFile = window.api.dropFiles;
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
  width: 90%;
  height: 90%;
  margin: 0 auto;
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