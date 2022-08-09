import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from './state/todo.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent {
  
  @Input() todos :any|Todo[];
  @Output() delete = new EventEmitter<string>();
  @Output() complete = new EventEmitter()
  control!: FormControl;
  trackByFn(index:any, todo:any) {
    return todo.id;
  }
}
  


