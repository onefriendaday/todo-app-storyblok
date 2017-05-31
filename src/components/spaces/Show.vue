<template>
  <div>
    <top-bar>
      <div slot="headline" class="uk-margin-right">
        TODO list
      </div>
    </top-bar>
    <main-wrapper>
      <div>
        <input type="text" v-model="new_todo">
        <a class="uk-button" v-on:click.prevent="createTodo" href="#">Create todo</a>
      </div>

      <div v-for="todo in todos">
        <div class="uk-margin-top uk-margin-bottom"><a class="uk-button" v-on:click="toggleTodo(todo._uid)">Check TODO</a> {{ todo.name }} | Status {{todo.checked}}</div>
      </div>

      <hr>
    </main-wrapper>
  </div>
</template>

<script>
  const _ = require('underscore')
  import Story from '../../models/story'

  export default {
    props: ['id'],

    data() {
      return {
        todos: [],
        new_todo: ''
      }
    },

    computed: {

    },

    mounted() {
      Story(this)
        .get({id: 40607})
        .then((res) => {
          this.todos = res.body.story.content.body
        })
    },

    methods: {
      createTodo() {
        this.todos.push({component: 'todo', name: this.new_todo, checked: false})
        this.save()
      },

      toggleTodo(uid) {
        for (var i = 0; i < this.todos.length; i++) {
          if (uid == this.todos[i]._uid) {
            this.todos[i].checked = !this.todos[i].checked
          }
        }

        this.save()
      },

      save() {
        Story(this)
          .update({id: 40607}, {story: {content: {component: 'root', body: this.todos}}})
          .then((res) => {
            console.log(res)
          })
      }
    }
  }
</script>

<style lang="scss">

</style>
