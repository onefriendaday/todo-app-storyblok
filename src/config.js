export default {
  get: function (key) {
    return this.data[key]()
  },
  data: {
    api: function () {
      var api = 'https://api.storyblok.com/v1'
      return api
    }
  }
}
