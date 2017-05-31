import Vue from 'vue'

export default (ctx) => {
  return Vue.resource('spaces/' + ctx.space_id + '/crawl')
}
