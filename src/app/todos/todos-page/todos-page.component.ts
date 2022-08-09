import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VISIBILITY_FILTER,initialFilters } from '../filters/filter.model'; 
import { Todo } from '../state/todo.model';
import { TodosQuery } from '../state/todos.query';
import { TodosService } from '../state/todos.service';
import { Observable, tap, map } from 'rxjs';
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
  count= this.todosQuery.getCount();
  constructor(private todosQuery: TodosQuery, 
  private todosService: TodosService) {
  }
  ngOnInit() {
    this.todos$ = this.todosQuery.selectVisibleTodos$
    // .pipe(
    //     tap(todos => {
    //       console.log('xem ben trong todos', todos);
    //       // goi api bao rang dang co du lieu di qua
    //       // goi snackbar, noti o goc man hinh
    //     }),
    //     // map(todos => ....)
    //   );
    this.activeFilter$ = this.todosQuery.selectVisibilityFilter$;
  }
  add(input: HTMLInputElement) {
    this.todosService.add(input.value);
    if(input.value !==''){
    }
    input.value = '';
    this.count = this.todosQuery.getCount();
  }
  complete(todo: Todo) {
    this.count = this.todosQuery.getCount();
    // ok, khi bam vao check box thi no se chay vao day
    // vi minh ban du lieu ko dung la todo, ban ra dang la {ketqua: boolean}  ta can sua lai ben trong
    // console.log('todo sau khi bam vao chec  ');
    this.todosService.complete(todo);
    this.todosQuery.getAll().filter( todo => {
      if(todo.completed === true ){
        this.count--;}
    })
    
  }
  delete(id: string) {
    this.todosService.delete(id);
    this.count = this.todosQuery.getCount();
  }

  changeFilter(filter: VISIBILITY_FILTER) {
    this.todosService.updateFilter(filter);
  }

  checkAll =false;
  toggleAll(){
    const check = this.todosQuery.getAll().every((todo: Todo) => todo.completed === true);
    if(this.checkAll === true) {
      this.checkAll = false;
    }
     console.log( this.count)

    if(this.checkAll === false && check ===true) {
      this.checkAll = true;
    }

    this.todosQuery.getAll().map(todo => {
    this.complete({id: todo.id, completed: this.checkAll, title: todo.title})
    });
  }
}