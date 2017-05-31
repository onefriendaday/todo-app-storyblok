<template>
  <div class="uk-height-1-1 uk-form">
    <div class="login uk-flex uk-flex-middle uk-width-1-1">
      <div class="login__container">
        <div class="login__logo uk-margin-bottom uk-margin-bottom uk-text-center">
          TODO app
        </div>

        <form class="uk-form" v-on:submit.prevent="login" v-if="!show_signup"> 
          <div class="uk-form-row">
            <label for="user_email" class="email"></label>
            <input v-model="user.email" class="uk-width-1-1 uk-form-large" id="user_email" type="text" placeholder="Email">
          </div>
          <div class="uk-form-row">
            <label for="user_password" class="password"></label>
            <input v-model="user.password" class="uk-width-1-1 uk-form-large" id="user_password" type="password" placeholder="Password">
          </div>
          <div class="uk-form-row">
            <button class="uk-button uk-button-large uk-button-primary" type="submit">
              Login
            </button>
            <div class="uk-float-right uk-margin-top uk-hidden">
            No account yet? <button class="uk-button-link" v-on:click="switch_to(true)">Switch to signup</button>
            </div>
          </div>
        </form>

        <form class="uk-form" v-on:submit.prevent="signup" v-if="show_signup"> 
          <div class="uk-form-row">
            <label for="user_email" class="email"></label>
            <input v-model="user.email" class="uk-width-1-1 uk-form-large" id="user_email" type="text" placeholder="Email">
          </div>
          <div class="uk-form-row">
            <label for="user_password" class="password"></label>
            <input v-model="user.password" class="uk-width-1-1 uk-form-large" id="user_password" type="password" placeholder="Password">
          </div>
          <div class="uk-form-row">
            <label for="password_confirmation" class="password"></label>
            <input v-model="user.password_confirmation" class="uk-width-1-1 uk-form-large" id="password_confirmation" type="password" placeholder="Password confirmation">
          </div>
          <div class="uk-form-row">
            <button class="uk-button uk-button-large uk-button-primary" type="submit">
              Signup
            </button>
            <div class="uk-float-right uk-margin-top">
              <button class="uk-button-link" v-on:click="switch_to(false)">Switch to login</button>
            </div>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
  import { token } from '../libs/token'
  import Space from '../models/space'

  export default {
    name: 'main',
    data() {
      return {
        show_signup: false,
        user: {
          email: null,
          password: null,
          password_confirmation: null
        }
      }
    },
    created: function () {
      this.resource = this.$resource('users/{id}', {}, {
        login: { method: 'POST', url: 'users/login' },
        signup: { method: 'POST', url: 'users/signup' }
      })

      Space()
        .get()
        .then(() => {
          this.$router.push('/me')
        })
    },
    methods: {
      switch_to: function(show_signup) {
        this.show_signup = show_signup
      },
      login: function () {
        this.resource.login(this.user)
          .then((req) => {
            token.set(req.data)
            this.$resource('spaces{/id}')
            .get()
            .then((req) => {
              this.$store.spaces = req.data
              this.$router.push('/me')
            }).catch(this.$helper.responseErrorHandler)
          }).catch(this.$helper.responseErrorHandler)
      },
      signup: function () {
        if (!this.user.email) {
          return this.$helper.notify('Email can\'t be empty', 'warning')
        }
        if (!this.user.password) {
          return this.$helper.notify('Password can\'t be empty', 'warning')
        }
        if (this.user.password != this.user.password_confirmation) {
          return this.$helper.notify('Please check the password confirmation.', 'warning')
        }
        this.resource.signup({user: this.user})
          .then((req) => {
            token.set(req.data)
            this.$resource('spaces{/id}')
            .get()
            .then((req) => {
              this.$store.spaces = req.data
              this.$router.push('/me')
            }).catch(this.$helper.responseErrorHandler)
          }).catch(this.$helper.responseErrorHandler)
      }
    }
  }

</script>

<style scoped lang="scss">
  @import '../styles/variables';

  .login {
    height: 100vh;
    background: #382d25;
  }

  .login__container {
    width: 100%;
    max-width: 360px;
    margin: -100px auto 0;
    padding: $utility-margin;
    background: #fff;
    border: $border;
  }

  .login__logo {
    img {
      height:40px;
    }
  }
</style>
