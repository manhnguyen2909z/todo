import { Injectable } from '@angular/core';
import { TodosState, TodosStore } from './todos.store';
import { Todo } from './todo.model';
import { QueryEntity } from '@datorama/akita';
import { combineLatest } from 'rxjs';
import { VISIBILITY_FILTER } from '../filters/filter.model'; 
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodosQuery extends QueryEntity<TodosState> {
  selectVisibilityFilter$ = this.select(state => state.ui.filter);
  selectVisibleTodos$ = combineLatest(
    this.selectVisibilityFilter$,
    this.selectAll(),
    this.getVisibleTodos
  );

  constructor(protected override store: TodosStore) {
    super(store);
  }

   getVisibleTodos(filter: VISIBILITY_FILTER, todos: any[]): Todo[] {
    switch (filter) {
      case VISIBILITY_FILTER.SHOW_COMPLETED:
        return todos.filter((t: { completed: any; }) => t.completed);
      case VISIBILITY_FILTER.SHOW_ACTIVE:
        return todos.filter((t: { completed: any; }) => !t.completed);
      default:
        return todos;
    }
  }
 
}
