import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { MoviesDataSource } from '../services/movies.datasource';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../models';

@Component({
  selector: 'app-movies-data-table',
  templateUrl: './movies-data-table.component.html',
  styleUrls: ['./movies-data-table.component.scss'],
})
export class MoviesDataTableComponent implements AfterViewInit, OnInit {
  private valueSubject = new BehaviorSubject<string>('');
  movie: Movie;
  dataSource: MoviesDataSource;
  displayedColumns = ['id', 'name', 'director', 'rating'];
  value$ = this.valueSubject.asObservable();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('input', { static: false }) input: ElementRef;

  // public dataSource = ELEMENT_DATA;

  constructor(private moviesService: MoviesService) {}

  loadMoviesPage() {
    this.dataSource.loadMovies(
      this.input.nativeElement.value,
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize,
    );
  }

  ngOnInit() {
    // this.movie = this.route.snapshot.data["course"];
    this.dataSource = new MoviesDataSource(this.moviesService);
    // this.loadMoviesPage();
    this.dataSource.loadMovies('', 'name', 'asc', 0, 10);
  }

  ngAfterViewInit() {
    // console.log(this.sort);
    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(350),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          // this.loadMoviesPage();
          this.valueSubject.next(this.input.nativeElement.value);
        }),
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page, this.value$)
      .pipe(tap(() => this.loadMoviesPage()))
      .subscribe();

    // this.paginator.page.pipe(tap(() => this.loadMoviesPage())).subscribe();
  }

  onRowClicked(row: Movie) {
    console.log('Row clicked: ', row);
  }

  sortData($event) {
    console.log('sortData choosen: ', $event);
  }

  clearValue() {
    this.input.nativeElement.value = '';
    this.valueSubject.next('');
  }
}
