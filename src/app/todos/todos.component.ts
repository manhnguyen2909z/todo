import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from './state/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent {
  
  @Input() todos!:any| Todo[];
  @Output() complete = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<string>();
  @Output() showingClear = new EventEmitter();
  showClear(){
    this.showingClear.emit();
  }


  trackByFn(index:any, todo:any) {
    return todo.id;
  }
}
