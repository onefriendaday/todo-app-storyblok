import Vue from 'vue'

let store = new Vue({
  name: 'store',
  data() {
    return {
      spaces: []
    }
  }
})

export { store }

window.VueStore = store