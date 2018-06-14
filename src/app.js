(function() {
  'use strict';

  var vm = new Vue({
    el: '#app',
    data: {

      newTask: '',
      todos: [{
          name: 'task 1',
          isDone: false
        },
        {
          name: 'task 2',
          isDone: true
        }
      ]

    },
    methods: {
      addTask: function() {

        var item = {
          name: this.newTask,
          isDone: false
        }

        if (0 == item.name.length) {
          return;
        }

        this.todos.push(item);
        this.newTask = '';
      },
      deleteTask: function(index) {
        this.todos.splice(index, 1);
      },
      deleteCompltedTask: function() {
        if (!confirm("Do you delete completed task?")) {
          return;
        }
        // this.todos = this.todos.filter(function(todo) {
        //   return !todo.isDone;
        // });

        this.todos = this.countTask;
      }
    },
    computed: {
      countTask: function() {
        return this.todos.filter(function(todo) {
          return !todo.isDone;
        });
      }
    },
    watch: {
      todos: {
        handler: function() {
          localStorage.setItem('todos', JSON.stringify(this.todos));
        },
        deep: true
      }
    },
    mounted: function() {
      this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    }
  });
})();
