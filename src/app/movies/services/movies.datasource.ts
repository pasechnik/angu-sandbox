import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Movie } from '../models';
import { MoviesService } from './movies.service';

export class MoviesDataSource implements DataSource<Movie> {
  private moviesSubject = new BehaviorSubject<Movie[]>([]);
  private countSubject = new BehaviorSubject<number>(0);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public movies$ = this.moviesSubject.asObservable();
  public count$ = this.countSubject.asObservable();

  constructor(private moviesService: MoviesService) {}

  loadMovies(
    filter: string = '',
    sortField: string = 'name',
    sortOrder: string = 'asc',
    pageNumber: number = 0,
    pageSize: number = 10,
  ) {
    this.loadingSubject.next(true);

    this.moviesService
      .findMovies(filter, sortField, sortOrder, pageNumber, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => {
          this.loadingSubject.next(false);
          this.countSubject.next(this.moviesService.count);
        }),
      )
      .subscribe(movies => this.moviesSubject.next(movies));
  }

  connect(collectionViewer: CollectionViewer): Observable<Movie[]> {
    console.log('Connecting data source');
    return this.moviesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.moviesSubject.complete();
    this.loadingSubject.complete();
  }
}
