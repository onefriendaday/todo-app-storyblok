<template>
  <div>
    <sidebar></sidebar>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'main',
    data() {
      return {
      }
    },
    created() {
      this.getSpaces()
    },
    methods: {
      getSpaces() {
        return this.$resource('spaces{/id}').get()
          .then((req) => {
            this.$store.spaces = this.$helper.sortAlphabetically(req.data.spaces, 'name')
          }).catch(this.$helper.responseErrorHandler)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../styles/variables';

  .main {
    position: relative;
    z-index: 2;
    float: right;
    width: calc(100% - #{$sidebar-width});
    overflow: auto;
    max-height: 100%;
    height: 100vh;
    -webkit-overflow-scrolling: touch;
    background: #f5f6f7;
    transition: transform 500ms ease;
    will-change: transform;

    @media(max-width: 959px) {
      width: 100%;

      .sidebar--open & {
        transform: translate3d(260px, 0, 0);
      }
    }
  }
</style>
