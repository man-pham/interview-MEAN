import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movieDeleteIndex :number;
  movies:Movie[]=[];

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    const movieObservable = this.movieService.getMovies();

    movieObservable.subscribe(
    	(movies: Movie[]) => {
    		this.movies = movies;
    	},
    	(err) => {
    	},
    	() => {
    	});
  }
  deleteRental(movieId: string) {
    this.movieService.deleteMovie(movieId).subscribe(
      () => {
        this.movies.splice(this.movieDeleteIndex, 1);
        this.movieDeleteIndex = undefined;
      },
      (errorResponse: HttpErrorResponse) => {
       
      })
  }

}
