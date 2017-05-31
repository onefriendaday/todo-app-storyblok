<template>
  <div class="top-bar uk-flex">
    <button v-on:click="toggle_sidebar" class="uk-button uk-button-large top-bar__sitebar-toggle">
      <i class="uk-icon-navicon"></i>
      <i class="uk-icon-close"></i>
    </button>
    <div class="uk-flex uk-flex-middle top-bar--grow">
      <div class="top-bar--grow">
        <h1><slot name="headline"></slot></h1>
      </div>
      <div class="uk-position-relative uk-text-nowrap">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'top-bar',
    data() {
      return {
        username: 'user'
      }
    },
    methods:{
      toggle_sidebar: function(event) {
        document.body.classList.toggle('sidebar--open')
        event.currentTarget.classList.toggle('top-bar__sitebar-toggle--open')
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../styles/variables';

  .top-bar__actions {
    padding: 0 20px 0;
  }

  .top-bar--grow {
    flex-grow: 1;
  }

  .top-bar {
    min-height: $sidebar-item-top-min-height;
    background: #fff;
    border-bottom: $border;
    padding: 0 20px;

    h1 {
      margin: 0;
    }
  }

  .top-bar__sitebar-toggle {
    padding-left: 20px;
    background: #fff;
    color: #444;

    .uk-icon-navicon {
      display: inline-block;
    }

    .uk-icon-close {
      display: none;
    }

    @media (min-width: 960px) {
      display: none;
    }

    &.top-bar__sitebar-toggle--open {
      .uk-icon-navicon {
        display: none;
      }

      .uk-icon-close {
        display: inline-block;
      }
    }
  }
</style>
