import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books/books.component';

export const routes: Routes = [
  { path: 'books', component: BooksComponent, pathMatch: 'full' },
  { 
    path: '', redirectTo: 'books', pathMatch: 'full' 
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
