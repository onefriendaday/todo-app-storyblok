import Vue from 'vue'
import Router from 'vue-router'
import config from '../config'

// External Libraries
import VueResource from 'vue-resource'

import jQuery from 'jquery'
window.jQuery = jQuery

let UIKit = require('uikit')
global.UIKit = UIKit
require('uikit/src/js/components/notify.js')

// Own Components
import Login from 'components/Login'
import Sidebar from 'components/Sidebar'
import TopBar from 'components/TopBar'
import Main from 'components/Main'
import MainWrapper from 'components/MainWrapper'
import Subscriptions from 'components/Subscriptions'
import SpaceShow from 'components/spaces/Show'

// Own libs
import { token } from 'libs/token'
import { store } from 'libs/store'
import { helper } from 'libs/helper'

Vue.use(Router)
Vue.use(VueResource)

// init components
Vue.component('sidebar', Sidebar)
Vue.component('top-bar', TopBar)
Vue.component('subscriptions', Subscriptions)
Vue.component('main-wrapper', MainWrapper)

Vue.filter('date', function (date) {
  if (typeof date === 'undefined') {
    return ''
  }

  var dateObj = new Date(date)
  return dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString()
})

// init vue resource api
Vue.http.options = {
  root: config.get('api'),
  headers: {
    'Authorization': token.get()
  }
}

Vue.http.interceptors.push(function(request, next) {

  // continue to next interceptor
  next(function(response) {
    // modify response
    if (response.headers.map['Token']) {
      let authToken = response.headers.map['Token'][0]
      if (token.userId()) {
        window.localStorage.setItem('token', authToken)
        Vue.http.options.headers['Authorization'] = authToken
      } else {
        window.location.href = '#/'
        return { status: 404 }
      }
    } else {
      if (response.status === 401) {
        window.location.href = '#/'
      }
    }
    return response
  })
})

Vue.use({
  install: function(Vue) {
    Vue.prototype.$store = store
  }
})
Vue.use({
  install: function(Vue) {
    Vue.prototype.$helper = helper
  }
})

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/',
      component: Login
    },
    {
      name: 'dashboard',
      path: '/me',
      component: Main,
      children: [
        {
          name: 'show_space',
          path: 'spaces/:id',
          component: SpaceShow,
          props: true,
        }
      ]
    },

  ]
})
