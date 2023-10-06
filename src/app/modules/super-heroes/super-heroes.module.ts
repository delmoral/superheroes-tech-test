import { NgModule } from '@angular/core';

import { SuperHeroesRoutingModule } from './super-heroes-routing.module';
import { SuperHeroesListComponent } from './components/super-heroes-list/super-heroes-list.component';
import { SharedModule } from '../shared/shared.module';
import { SuperHeroDetailComponent } from './components/super-hero-detail/super-hero-detail.component';

@NgModule({
  declarations: [
    SuperHeroesListComponent,
    SuperHeroDetailComponent
  ],
  imports: [
    SharedModule,
    SuperHeroesRoutingModule
  ]
})
export class SuperHeroesModule { }
