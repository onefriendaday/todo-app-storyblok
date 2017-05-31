<template>
  <div class="sidebar">
    <div class="sidebar__wrapper">
      <div class="sidebar__item sidebar__item--top uk-clearfix">
        <div class="sidebar__logo uk-float-left">
          TODO app
        </div>
        <button v-on:click="logout" class="sidebar__button--logout uk-button uk-button-large uk-float-right">Logout</button>
      </div>
      <div class="sidebar__item sidebar__linklist">
        <router-link to="/me/spaces" class="sidebar__link sidebar__link--all">All Spaces</router-link>
        <template v-for="space in spaces">
          <router-link :to="{name: 'show_space', params: {id: space.id}}" class="sidebar__link" :class="{'router-link-active': active(space.id)}">{{space.name}}</router-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'sidebar',
    computed: {
      spaces: function() {
        return this.$store.spaces
      }
    },
    data() {
      return {
        username: 'user'
      }
    },
    methods: {
      active: function(id) {
        return id == this.$route.params.id
      },

      logout: function() {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('userId')
        window.localStorage.removeItem('role')
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped lang="scss">
   @import '../styles/variables';

  .sidebar {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    display: block;
    z-index: 1;
    color: #FFF;
    font-weight: 200;
    background-color: $sidebar-background;
  }

  .sidebar__wrapper {
    position: relative;
    max-height: 100%;
    min-height: 100%;
    overflow: auto;
    width: $sidebar-width - 1px;
    border-right: 1px solid darken($sidebar-background, 7%);
  }

  .sidebar__logo {
    padding-top: 10px;
    padding-left: $utility-margin;
  }

  .sidebar__item--top {
    min-height: $sidebar-item-top-min-height;
    background-color: darken($sidebar-background, 3%);
    border-bottom: 1px solid darken($sidebar-background, 7%);
  }

  .sidebar__link {
    display: block;
    padding: 13px 25px;
    border-bottom: 1px solid darken($sidebar-background, 7%);
    -webkit-transition: background ease .1s;
    transition: background ease .1s;
    color: $sidebar-link-color;
    text-decoration:none;
    text-transform: capitalize;

    &:hover {
      color: $sidebar-link-color-hover;
      background: $sidebar-link-background-hover;
    }

    &.router-link-active {
      padding-left: 20px;
      border-left: 5px solid $red;
    }

    &.sidebar__link--all {
      padding-left: 25px;
      border-left: 0px;
    }

    &.sidebar__link--sub {
      padding: 5px 25px;
      padding-left: 25px;
      border: 0;

      &.router-link-active {
        background: $sidebar-link-background-hover;
      }
    }
  }

  .sidebar__link-sub-container {
    border-bottom: 1px solid darken($sidebar-background, 7%);
    height: 0px;
    display: none;
    padding-bottom: 20px;

    .router-link-active + & {
      display: block;
      height: auto;
    }
  }

  .sidebar__button--logout {
    min-height: $sidebar-item-top-min-height;
    background: transparent;
    opacity: 0.5;
    color: #FFF;
    font-size: 0.8rem;

    &:hover {
      opacity: 1;
    }
  }
</style>
