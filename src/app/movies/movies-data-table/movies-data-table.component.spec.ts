import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesDataTableComponent } from './movies-data-table.component';

describe('SimulationDataTableComponent', () => {
  let component: MoviesDataTableComponent;
  let fixture: ComponentFixture<MoviesDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MoviesDataTableComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
