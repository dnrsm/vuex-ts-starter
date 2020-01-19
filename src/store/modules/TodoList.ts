import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import store from "@/store";

export interface ITodoListState {
  todos: ITodoState[];
}

export interface ITodoState {
  id: number;
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
  private SET_DONE(id: number) {
    (this.todos.find(item => item.id == id) || ({} as ITodoState)).done = !(
      this.todos.find(item => item.id == id) || ({} as ITodoState)
    ).done;
  }

  @Action
  public PutItem(item: string) {
    const id = this.todos.length ? this.todos.slice(-1)[0].id + 1 : 0;
    const todo = {
      id,
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
  public setDone(id: number) {
    this.SET_DONE(id);
  }
}

export const TodoListModule = getModule(TodoList);
