import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
  } from '@angular/core';
import { TodoFilter, VISIBILITY_FILTER } from './filter.model';
import { FormControl } from '@angular/forms';
import { Todo } from '../state/todo.model';
import { TodosQuery } from '../state/todos.query';
import { TodosService } from '../state/todos.service';
import { getValue } from '@datorama/akita';
import { filter } from 'rxjs';

interface TabHead {
  label: string;
  isActive: boolean;
}

  
  @Component({
    selector: 'app-todos-filters',
    templateUrl:'./filters.component.html',
    styleUrls:['./filters.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class TodosFiltersComponent implements OnInit {
    
    @Input() todos !:any| Todo[]
    @Output() complete = new EventEmitter<Todo>();
    @Output() delete = new EventEmitter<string>();
    @Input() active: any|VISIBILITY_FILTER;
    @Input() filters!: TodoFilter[];
    @Output() update = new EventEmitter<VISIBILITY_FILTER>();
    @Input() count!:number;
    control!: FormControl;  
    currentTab: any;
    
    constructor(private todosService: TodosService) {}
    ngOnInit() {
      this.currentTab = this.filters.find((filter) => filter.isActive);
    }
    onCheck(filter : VISIBILITY_FILTER ){
      this.todosService.updateFilter(filter) 
      }
    clear(){
      this.todosService.clearCompleted();
      this.count = this.todosService.getCount();
      }
    toggleTabs(currentTab: TabHead) {
      this.currentTab = currentTab;
      this.filters.forEach((filter) => {
        filter.isActive = false;
        if (filter.label === currentTab.label) {
          filter.isActive = true;
        }
      });
    }
    
  }
  