import { reactive } from 'vue'

const store = reactive({
  apps: window.api.getApps(),
  selectedApp: null,
  files: [],
  modal: false,
})

export default store