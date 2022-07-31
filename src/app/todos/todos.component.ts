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
  @Output() complete = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<string>();
  @Output() completed = new EventEmitter()
  @Output() checkCount = new EventEmitter();
  control!: FormControl;
  @Input() check =false;
  @Input() value = this.check;
  trackByFn(index:any, todo:any) {
    return todo.id;
  }
   toggleAll(){
    // chua nghi ra logic
    this.check = ! this.todos.every((t: { completed: boolean; }) => t.completed)
    }
}
  


