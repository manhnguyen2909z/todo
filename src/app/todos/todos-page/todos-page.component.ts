import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VISIBILITY_FILTER,initialFilters } from '../filters/filter.model'; 
import { Todo } from '../state/todo.model';
import { TodosQuery } from '../state/todos.query';
import { TodosService } from '../state/todos.service';
import { Observable } from 'rxjs';
import { style } from '@angular/animations';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-todos-page',
  templateUrl: './todos-page.component.html',
  styleUrls: ['./todos-page.component.scss']
  
})
export class TodosPageComponent implements OnInit {
  

  todos$!:Observable<Todo[]>;
  activeFilter$!: Observable<VISIBILITY_FILTER>;
  filters = initialFilters;
  count =0
  constructor(private todosQuery: TodosQuery, 
  private todosService: TodosService) {
  }
  ngOnInit() {
    // loc cac todo
    this.todos$ = this.todosQuery.selectVisibleTodos$;
    this.activeFilter$ = this.todosQuery.selectVisibilityFilter$;
  }
  check =false;
 
  add(input: HTMLInputElement) {
    this.todosService.add(input.value);
    if(input.value !==''){
      this.count++;
    }
    input.value = '';
  }
  complete(todo: Todo) {
    this.todosService.complete(todo);
  }

  delete(id: string) {
    this.todosService.delete(id);
    this.count--;
  }

  changeFilter(filter: VISIBILITY_FILTER) {
    this.todosService.updateFilter(filter);
  }
  checkCount(){
    this.check =!this.check
    if(this.check === false){
      this.count--
    }
  }
  toggleAll(){
   
  }
}