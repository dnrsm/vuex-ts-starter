<template>
  <div class="todo">
    <div>Todos: {{ totalItems }}</div>
    <form @submit.prevent="addItem">
      <input type="text" v-model="item" />
      <button type="submit">追加</button>
    </form>
    <ul>
      <template v-for="(todo, index) in todos">
        <li :key="index">
          <input
            type="checkbox"
            :checked="!todo.done"
            @change="isDone(todo.id)"
          />
          <span>ID: {{ todo.id }}</span>
          <span :class="{ isDone: !todo.done }">{{ todo.item }}</span>
          <button @click="deleteItem(index)">delete</button>
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { TodoListModule } from "@/store/modules/TodoList";

@Component
export default class TodoList extends Vue {
  private item: string = "";

  get todos() {
    return TodoListModule.todos;
  }

  get totalItems() {
    return TodoListModule.totalItems;
  }

  addItem() {
    TodoListModule.PutItem(this.item);
  }

  deleteItem(index: number) {
    TodoListModule.DeleteItem(index);
  }

  isDone(id: number) {
    TodoListModule.setDone(id);
  }
}
</script>

<style scoped>
.isDone {
  text-decoration: line-through;
}
</style>
