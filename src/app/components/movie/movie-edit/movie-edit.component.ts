import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';

import { Observable } from 'rxjs';
@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
  movie: Movie;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: Observable<string>
  errors: any[] = [];

  file: File;
  movieCompanys = Movie.COMPANYS;
  constructor(private movieService: MovieService, private afStorage: AngularFireStorage,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        
        this.getMovie(params['movieId']);
      })
  }
  updateMovie(movieId: string, movieData: any) {
    
    this.movieService.updateMovie(movieId, movieData).subscribe(
      (updatedMovie: Movie) => {
        console.log(updatedMovie)
        this.router.navigate([`/movies`]);
        this.movie = updatedMovie;

        
      })
     
  }
  getMovie(movieId: string) {
    this.movieService.getMovie(movieId).subscribe(
      (movie: Movie) => {
          
        this.movie = movie;
     
        
      });
  }

  async handleImageChange(event){
    this.file=event.target.files[0];
      const filePath = `${this.file.name}`;    //path at which image will be stored in the firebase storage
      const snap = await this.afStorage.upload(filePath, this.file);    //upload task
      this.getUrl(snap);
    } 
  
    
    private async getUrl(snap: firebase.storage.UploadTaskSnapshot) {
      const url = await snap.ref.getDownloadURL();
      this.movie.imageUrl = url;  //store the URL
      console.log(this.movie.imageUrl );
    }
}
