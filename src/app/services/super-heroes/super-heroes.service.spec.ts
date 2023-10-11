import { TestBed } from '@angular/core/testing';
import { first } from 'rxjs/operators'

import { SuperHeroesService } from './super-heroes.service';
import { SuperHero } from 'src/app/models/super-heroes.model';

describe('SuperHeroesService read operations', () => {
  let service: SuperHeroesService;

  const MOCK_NEW_HERO = { heroId: 12, name: 'NEW HERO', realName: 'REAL NAME', age: 70 }
  const MOCKDIFIED_HERO = { heroId: 3, name: 'Manolito stronger than ever', realName: 'Manolo Javier', age: 36 }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperHeroesService);
  });

  it('should read super heroes list', () => {
    let result: SuperHero[] = [];
    service.readSuperHeroes();
    service.superHeroesList$.pipe(first()).subscribe((res: SuperHero[]) => result = res).unsubscribe();
    expect(result.length).toBe(11);
  });

  it('should find super hero by id', () => {
    let result: SuperHero = service.findSuperHeroById(3);
    expect(result.name).toBe('Manolito el fuerte');
    expect(result.realName).toBe('Manolo');
    expect(result.age).toBe(35);
  });

  it('should find super heroes by name', () => {
    let result: SuperHero[] = [];
    service.findSuperHeroByName('man');
    service.superHeroesList$.pipe(first()).subscribe(res => result = res).unsubscribe();
    expect(result.length).toBe(3);
  });

  it('should create a super hero', () => {
    let result: SuperHero[] = [];
    service.createHero(MOCK_NEW_HERO);
    service.superHeroesList$.pipe(first()).subscribe(res => result = res).unsubscribe();
    expect(result.length).toBe(12);
  });

  it('should modify a super hero', () => {
    let result: SuperHero[] = [];
    service.updateHero(MOCKDIFIED_HERO);
    service.superHeroesList$.pipe(first()).subscribe(res => result = res).unsubscribe();
    expect(result[2].name).toBe('Manolito stronger than ever');
  });

  it('should delete a super hero', () => {
    let result: SuperHero[] = [];
    service.deleteHero(12);
    service.superHeroesList$.pipe(first()).subscribe(res => result = res).unsubscribe();
    expect(result.length).toBe(11);
  });
});