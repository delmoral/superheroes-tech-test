import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperHeroDetailComponent } from './super-hero-detail.component';

xdescribe('SuperHeroDetailComponent', () => {
  let component: SuperHeroDetailComponent;
  let fixture: ComponentFixture<SuperHeroDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperHeroDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperHeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
