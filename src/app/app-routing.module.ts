import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './todos/todos.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'todo' },
  { path: 'todo', component: TodosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
