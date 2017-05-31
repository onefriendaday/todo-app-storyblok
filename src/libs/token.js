import Vue from 'vue'

const token = {
  get: function() {
    return window.localStorage.getItem('token')
  },
  set: function(data) {
    window.localStorage.setItem('role', data.role || 'normal')
    window.localStorage.setItem('token', data.access_token)
    window.localStorage.setItem('userId', data.user_id)
    Vue.http.options.headers['Authorization'] = this.get()
  },
  userId: function() {
    return window.localStorage.getItem('userId')
  },
  userRole: function() {
    return window.localStorage.getItem('role') || 'normal'
  }
}

export { token }