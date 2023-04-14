<script setup>
const props = defineProps({
  show: Boolean,
  element: Object,
  type: String,
  id: Number
})

console.log(props);

defineEmits(['close'])

function deneme() {
  console.log('esc ye basıldı')
}
</script>

<template>
  <Transition name="modal">
    <div v-if="show" id="modal-mask" @click="$emit('close')">
      <div id="modal-container" @click.stop="">
        <div id="modal-body">
          <component :is="element" />
        </div>
        <div id="modal-footer">
          <template v-if="type === 'dropzone'">
            <button @click="$emit('close')">İptal</button>
            <button @click="$emit('close')">Kaydet</button>
          </template>
          <template v-else>
            <button @click="$emit('close')">Kapat</button>
            <button @click="$emit('close')">Çalıştır</button>
          </template>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
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
  margin-right: 10px;
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
