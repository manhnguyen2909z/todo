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
  
  @Component({
    selector: 'app-todos-filters',
    templateUrl:'./filters.component.html',
    styleUrls:['./filters.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class TodosFiltersComponent implements OnInit {
    @Input() todo:any| Todo[];
    @Output() complete = new EventEmitter<Todo>();
    @Output() delete = new EventEmitter<string>();
    @Input() active: any|VISIBILITY_FILTER;
    @Input() filters!: TodoFilter[];
    @Output() update = new EventEmitter<VISIBILITY_FILTER>();
    @Input()showClear =false;

    control!: FormControl;  
    currentTab: any;
    
    constructor(private todosQuery: TodosQuery, 
      private todosService: TodosService) {}

    ngOnInit() {
      this.currentTab = this.filters.find((filter) => filter.isActive);
      this.control = new FormControl(this.active);
      this.control.valueChanges.subscribe((c) => {
        this.update.emit(c);
      });
    }

    onSubmit(){
     console.log('??')
    }
    toggleTabs(currentTab: any) {
      this.currentTab = currentTab;
      this.filters.forEach((filter) => {
        filter.isActive = false;
        if (filter.label === currentTab.label) {
          filter.isActive = true;
        }
      });
    }
  }
  