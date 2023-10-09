import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SUPER_HEROES_LIST_DEFAULT } from 'src/app/constants/super-heroes.constants';
import { SuperHero } from 'src/app/models/super-heroes.model';

@Injectable({ providedIn: 'root' })
export class SuperHeroesService {
  superHeroesList: SuperHero[] = SUPER_HEROES_LIST_DEFAULT;
  private _superHeroesList = new BehaviorSubject<SuperHero[]>(this.superHeroesList);
  superHeroesList$ = this._superHeroesList.asObservable();

  constructor() { }

  readSuperHeroes() {
    this._superHeroesList.next(this.superHeroesList);
  }

  findSuperHeroById(id: number) {
    const foundHero = this.superHeroesList.filter((hero: SuperHero) => hero.heroId === id);
    this._superHeroesList.next(foundHero);
  }

  findSuperHeroByName(name: string) {
    const query = name.trim().toUpperCase();
    const foundHeroes = this.superHeroesList.filter((hero: SuperHero) => hero.name.toUpperCase().includes(query));
    this._superHeroesList.next(foundHeroes);
  }

  modifyHero(newHeroData: SuperHero) {
    const heroIndex = this.superHeroesList.findIndex(hero => hero.heroId === newHeroData.heroId);
    this.superHeroesList[heroIndex] = newHeroData;
    this._superHeroesList.next(this.superHeroesList);
  }

  deleteHero(id: number) {
    const heroIndex = this.superHeroesList.findIndex(hero => hero.heroId === id);
    this.superHeroesList.splice(heroIndex, 1);
    this._superHeroesList.next(this.superHeroesList);
  }
}
