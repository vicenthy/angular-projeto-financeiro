import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaListComponent } from './categoria-list/categoria-list.component';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';

const routes: Routes = [
  { path: '', component: CategoriaListComponent},
  { path: 'nova', component: CategoriaFormComponent},
  { path: 'editar/:id', component: CategoriaFormComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
