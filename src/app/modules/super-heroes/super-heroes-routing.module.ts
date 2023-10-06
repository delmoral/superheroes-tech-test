import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperHeroesListComponent } from './components/super-heroes-list/super-heroes-list.component';
import { SuperHeroDetailComponent } from './components/super-hero-detail/super-hero-detail.component';

const routes: Routes = [
  {
    path: '',
    component: SuperHeroesListComponent
  },
  {
    path:':heroId',
    component: SuperHeroDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperHeroesRoutingModule { }
