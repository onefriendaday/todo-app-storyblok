import Vue from 'vue'

export default (ctx) => {
  return Vue.resource('spaces/' + ctx.id + '/crawl_configs/{id}')
}
