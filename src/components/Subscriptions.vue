<template>
  <ul class="subscriptions uk-list">
    <li class="subscription uk-display-inline-block uk-text-center" v-for="subscription in subscriptions" :class="active(subscription)">
      <div class="subscription__name uk-h2 uk-margin-top">{{subscription.name}}</div>
      <div class="subscription__info">{{subscription.info}}</div>
      <div class="subscription__price uk-margin-bottom">{{subscription.price}}</div>
      <button class="uk-button uk-button-primary">Subscribe</button>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'subscriptions',
    props: ['space'],
    data() {
      return {
        subscriptions: []
      }
    },
    methods: {
      active: function(subscription) {
        if(!this.space.plan && subscription.id == 0) {
          return 'subscription--active'
        }
        if(subscription.id == this.space.plan) {
          return 'subscription--active'
        } else {
          return ''
        }
      }
    },
    mounted: function() {
      this.subscriptions = [
        {
          id: 0,
          name: 'Starter',
          info: '5 Pages',
          price: '$ 0,00'
        },
        {
          id: 1,
          name: 'Basic',
          info: '1.000 Pages',
          price: '$ 199,00'
        },
        {
          id: 1,
          name: 'Advanced',
          info: '10.000 Pages',
          price: '$ 899,00'
        }
      ]
    }
  }
</script>

<style scoped lang="scss">
  @import '../styles/variables';
  @import '../styles/subscriptions';
</style>