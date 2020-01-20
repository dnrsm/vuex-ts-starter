import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import store from "@/store";
import uuid from "uuid/v4";

export interface ITodoListState {
  todos: ITodoState[];
}

interface ITodoState {
  id: string;
  createdAt: Date;
  item: string;
  done: boolean;
}

@Module({ dynamic: true, store, name: "todo", namespaced: true })
class TodoList extends VuexModule implements ITodoListState {
  public todos: ITodoState[] = [];

  public get totalItems(): number {
    return this.todos.length;
  }

  @Mutation
  private PUT_ITEM(todo: ITodoState) {
    this.todos.push(todo);
  }

  @Mutation
  private DELETE_ITEM(index: number) {
    this.todos.splice(index, 1);
  }

  @Mutation
  private SET_DONE(id: string): void {
    this.todos = this.todos.map(todo => {
      if (todo.id !== id) return todo;
      return { ...todo, done: !todo.done };
    });
  }

  @Action
  public PutItem(item: string): void {
    const id = uuid();
    const todo = {
      id,
      createdAt: new Date(),
      item,
      done: true
    };
    this.PUT_ITEM(todo);
  }

  @Action
  public DeleteItem(index: number) {
    this.DELETE_ITEM(index);
  }

  @Action
  public setDone(id: string) {
    this.SET_DONE(id);
  }
}

export const TodoListModule = getModule(TodoList);
