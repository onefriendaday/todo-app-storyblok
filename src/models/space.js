import Vue from 'vue'

export default () => {
  return Vue.resource('spaces/{id}')
}
