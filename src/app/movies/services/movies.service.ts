import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Movie } from '../models';
import { tap, catchError, delay, map } from 'rxjs/operators';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  public movies: Movie[] = [];
  public count = 0;

  constructor(private http: HttpClient) {}

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

  findMovies(
    filter = '',
    sortField: string = 'name',
    sortOrder = 'asc',
    pageNumber = 0,
    pageSize = 3,
  ): Observable<Movie[]> {
    let params: HttpParams = new HttpParams()
      .set('_sort', sortField)
      .set('_order', sortOrder)
      .set('_page', (pageNumber + 1).toString())
      .set('_limit', pageSize.toString());
    if (filter.length) {
      console.log('filter', filter);
      params = params.set('name', filter);
    }

    return this.http
      .get<Movie[]>(API_URL + '/movies', {
        params,
        observe: 'response',
      })
      .pipe(
        delay(1000),
        tap(response => (this.count = parseInt(response.headers.get('x-total-count'), 10))),
        map(response => response.body),
        tap(movies => (this.movies = movies)),
        catchError(this.handleError),
      );
  }

  // API: GET /movies
  public getAllMovies() {
    // will use this.http.get()
    return this.http.get<Movie[]>(API_URL + '/movies').pipe(
      tap(movies => {
        this.movies = movies;
      }),
    );
  }

  // API: POST /movies
  public createMovie(element: Movie) {
    // will use this.http.post()
  }

  // API: GET /movies/:id
  public getMovieById(elementId: number) {
    // will use this.http.get()
  }

  // API: PUT /movies/:id
  public updateMovie(element: Movie) {
    // will use this.http.put()
  }

  // DELETE /movies/:id
  public deleteMovieById(elementId: number) {
    // will use this.http.delete()
  }
}
