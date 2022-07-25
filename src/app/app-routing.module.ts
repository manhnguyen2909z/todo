import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosPageComponent } from './todos/todos-page/todos-page.component'; 

const routes: Routes = [

  {
    path: '',
    component: TodosPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }