import { reactive } from 'vue'

const store = reactive({
  modal: {
    show: false,
    message: ''
  },
  showModal(msg) {
    this.modal.message = msg
    this.modal.show  =true
  }
})

export default store