import { TestBed } from '@angular/core/testing';
import { first } from 'rxjs/operators'

import { SuperHeroesService } from './super-heroes.service';
import { SuperHero } from 'src/app/models/super-heroes.model';

describe('SuperHeroesService read operations', () => {
  let service: SuperHeroesService;

  const MOCKDIFIED_HERO = { heroId: 3, name: 'Manolito stronger than ever', realName: 'Manolo Javier', age: 36 }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperHeroesService);
  });

  it('should read super heroes list', () => {
    let result: SuperHero[] = [];
    service.readSuperHeroes();
    service.superHeroesList$.pipe(first()).subscribe((res: SuperHero[]) => result = res).unsubscribe();
    expect(result.length).toBe(4);
  });

  it('should find super hero by id', () => {
    let result: SuperHero[] = [];
    service.findSuperHeroById(3);
    service.superHeroesList$.pipe(first()).subscribe(res => result = res).unsubscribe();
    expect(result.length).toBe(1);
  });

  it('should find super heroes by name', () => {
    let result: SuperHero[] = [];
    service.findSuperHeroByName('man');
    service.superHeroesList$.pipe(first()).subscribe(res => result = res).unsubscribe();
    expect(result.length).toBe(3);
  });

  it('should modify a super hero', () => {
    let result: SuperHero[] = [];
    service.modifyHero(MOCKDIFIED_HERO);
    service.superHeroesList$.pipe(first()).subscribe(res => result = res).unsubscribe();
    expect(result[2].name).toBe('Manolito stronger than ever');
  });

  it('should delete a super hero', () => {
    let result: SuperHero[] = [];
    service.deleteHero(1);
    service.superHeroesList$.pipe(first()).subscribe(res => result = res).unsubscribe();
    expect(result.length).toBe(3);
  });
});