import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperHero } from 'src/app/models/super-heroes.model';
import { SuperHeroesService } from 'src/app/services/super-heroes/super-heroes.service';

@Component({
  selector: 'app-super-hero-detail',
  templateUrl: './super-hero-detail.component.html',
  styleUrls: ['./super-hero-detail.component.scss']
})
export class SuperHeroDetailComponent implements OnInit {
  newHeroId = -1;

  currentHero: SuperHero = {
    heroId: 0,
    name: '',
    realName: '',
    age: 0,
  }

  constructor(
    private superHeroesService: SuperHeroesService,
    private _route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      if (params['heroId'] !== 'new') {
        this.currentHero = this.superHeroesService.findSuperHeroById(parseInt(params['heroId'], 10));
      } else {
        this.newHeroId = history.state.newId
      }
    }).unsubscribe();
  }

  saveSuperHero() {
    if (this.currentHero.heroId === 0) {
      this.currentHero.heroId = this.newHeroId;
      this.superHeroesService.createHero(this.currentHero);
    } else {
      this.superHeroesService.updateHero(this.currentHero);
    }
    this.router.navigate(['/']);
  }
}