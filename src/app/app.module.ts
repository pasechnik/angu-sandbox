import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { FormsModule } from '@angular/forms';
import { TodosFiltersPipe } from './shared/todos-filters.pipe';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, TodosComponent, TodoFormComponent, TodosFiltersPipe],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, FormsModule, ScrollingModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
