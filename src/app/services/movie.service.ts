import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {  Observable } from 'rxjs';
import { Movie } from '../models/movie.model';
@Injectable({
  providedIn: 'root'
})
export class MovieService {

constructor(private http: HttpClient ) { }


public getMovies(): Observable<any> {
  return this.http.get('/api/v1/movies');
}
public createMovie(movie: Movie): Observable<any> {
  return this.http.post('/api/v1/movies', movie);
}

public deleteMovie(movieId: string): Observable<any> {
  return this.http.delete(`/api/v1/movies/${movieId}`);
}
public updateMovie(movieId: string, movieData: any): Observable<any> {
  return this.http.patch(`/api/v1/movies/${movieId}`, movieData);
}
public getMovie(movieId: string): Observable<any> {
  return this.http.get(`/api/v1/movies/${movieId}`);
}


}
