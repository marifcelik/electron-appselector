import { reactive } from 'vue'

const store = reactive({
  appId: undefined,
  files: [],
  modal: false
})

export default store