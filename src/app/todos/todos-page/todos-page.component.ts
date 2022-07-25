import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VISIBILITY_FILTER,initialFilters } from '../filters/filter.model'; 
import { Todo } from '../state/todo.model';
import { TodosQuery } from '../state/todos.query';
import { TodosService } from '../state/todos.service';
import { Observable } from 'rxjs';
import { style } from '@angular/animations';


@Component({
  selector: 'app-todos-page',
  templateUrl: './todos-page.component.html',
  styleUrls: ['./todos-page.component.scss']
  
})
export class TodosPageComponent implements OnInit {
  todos$!: Observable<Todo[]>;
  activeFilter$!: Observable<VISIBILITY_FILTER>;
  filters = initialFilters;
  showClear!: boolean;
 
  
  constructor(private todosQuery: TodosQuery, 
    private todosService: TodosService) {
  }

  ngOnInit() {
    this.todos$ = this.todosQuery.selectVisibleTodos$;
    this.activeFilter$ = this.todosQuery.selectVisibilityFilter$;
  }


  add(input: HTMLInputElement) {
    this.todosService.add(input.value);
    input.value = '';
    this.todos$.pipe
 
  }

  complete(todo: Todo) {
    this.todosService.complete(todo);
  }

  delete(id: string) {
    this.todosService.delete(id);
  }

  changeFilter(filter: VISIBILITY_FILTER) {
    this.todosService.updateFilter(filter);
  }

}