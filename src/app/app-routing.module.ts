import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'todo/:id',
    loadChildren: () => import('./pages/edit-todo/edit-todo.module').then( m => m.EditTodoPageModule)
  },
  {
    path: 'todo/new',
    loadChildren: () => import('./pages/edit-todo/edit-todo.module').then( m => m.EditTodoPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'edit-todo',
    loadChildren: () => import('./pages/edit-todo/edit-todo.module').then( m => m.EditTodoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
