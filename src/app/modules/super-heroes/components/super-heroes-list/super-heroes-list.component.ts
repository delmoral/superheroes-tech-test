import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SuperHero } from 'src/app/models/super-heroes.model';
import { SuperHeroesService } from 'src/app/services/super-heroes/super-heroes.service';

@Component({
  selector: 'app-super-heroes-list',
  templateUrl: './super-heroes-list.component.html',
  styleUrls: ['./super-heroes-list.component.scss']
})
export class SuperHeroesListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  columns: string[] = ['heroId', 'name', 'realName', 'age', 'actions'];
  pageSize = 5;
  pageIndex = 0;

  superHeroesList: SuperHero[] = [];
  superHeroesDataSource: SuperHero[] = [];

  suscriptions: Subscription[] = []

  constructor(
    private superHeroesService: SuperHeroesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.superHeroesService.readSuperHeroes();

    this.suscriptions.push(this.superHeroesService.superHeroesList$.subscribe((newList: SuperHero[]) => {
      this.superHeroesList = newList;
      this.buildPaginatorData();
    }))
  }

  ngOnDestroy() {
    this.suscriptions.map(suscription => {
      suscription.unsubscribe();
    })
  }

  filterSuperHero(query: string) {
    this.superHeroesService.findSuperHeroByName(query)
  }

  createSuperHero() {
    this.router.navigate(['/new'], { state: { newId: this.superHeroesList.length + 1 } });
  }

  modifySuperHero(heroId: number) {
    this.router.navigate([`/${heroId}`]);
  }

  deleteSuperHero(heroId: number) {
    this.superHeroesService.deleteHero(heroId)
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.buildPaginatorData();
  }

  buildPaginatorData() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.superHeroesDataSource = this.superHeroesList.slice(start, end);
  }
}
