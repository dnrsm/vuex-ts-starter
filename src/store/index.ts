import Vue from "vue";
import Vuex from "vuex";

import { ITodoListState } from "./modules/TodoList";

Vue.use(Vuex);

export interface IRootState {
  todos: ITodoListState;
}

export default new Vuex.Store<IRootState>({});
