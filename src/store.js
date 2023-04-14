import { reactive } from 'vue'

const store = reactive({
  apps: [
    { name: 'uygulama 1', icon: '/home/path', details: 'açıklama' },
    { name: 'uygulama 2', icon: '/home/path', details: 'açıklama' }
  ],
  modal: {
    show: false,
    message: ''
  },
  showModal(msg) {
    this.modal.message = msg
    this.modal.show = true
  }
})

export default store