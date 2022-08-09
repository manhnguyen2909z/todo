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
  // cai ben trong ngoac nhon la kieu du lieu ban ra
  // ghi ro rang de tranh bi nham lan, gom ten thuoc tinh, va gia tri, nhu vay luc ghi ben html se ko bi nham
  @Output() complete = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<string>();

  control!: FormControl;
  ngOnInit():void {
    // this.control = new FormControl(this.todo.completed);
    // this.control.valueChanges.subscribe((completed: boolean) => {
    // this.complete.emit({ ...this.todo, completed });
    // });
    // ?? dinh lam gi the?
  }
}
