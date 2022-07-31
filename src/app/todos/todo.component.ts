import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Todo } from './state/todo.model';
import { FormControl } from '@angular/forms';
import { NgModule } from '@angular/core'; 

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./todo.component.scss'],
  
})
export class TodoComponent implements OnInit {

  @Input() todo:any|Todo;
  @Input() count!:number
  @Output() complete = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<string>();
  @Input() check = false;
  @Output() checkCount = new EventEmitter();
  checked(){
   this.check =!this.check
   this.checkCount.emit();
  }
  control!: FormControl;
  ngOnInit():void {
    this.control = new FormControl(this.todo.completed);
    this.control.valueChanges.subscribe((completed: boolean) => {
    this.complete.emit({ ...this.todo, completed });
    });
  }
}
