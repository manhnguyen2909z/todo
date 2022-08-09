import { TodosStore } from "./todos.store";
import { createTodo, Todo } from "./todo.model";
import { Injectable } from "@angular/core";
import { VISIBILITY_FILTER } from "../filters/filter.model"; 
import { ID } from "@datorama/akita";
import { TodosQuery } from "./todos.query";

@Injectable({ providedIn: "root" })
export class TodosService {

  constructor(
  private todosStore: TodosStore,
  private todosQuery : TodosQuery) {}
  updateFilter(filter: VISIBILITY_FILTER) {
    this.todosStore.update({
      ui: {
        filter
      }
    });
  }
  complete({ id, completed }: Todo) {
    this.todosStore.update(id, { completed: !completed });
  }
  add(title: string) {
    if(title.trim() !==''){
      const todo = createTodo(title);
      this.todosStore.add(todo);
    }
  }
  delete(id: string) {
    this.todosStore.remove(id);
  }
  clearCompleted(){
    this.todosQuery.getAll().filter(
      (todo) => {
        if(todo.completed === true)
        this.delete(todo.id)
      }
    )
  }
  getCount(){

    return  this.todosQuery.getCount();
  }
}
