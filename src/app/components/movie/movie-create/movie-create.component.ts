import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css']
})
export class MovieCreateComponent implements OnInit {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: Observable<string>
  movieCompanys = Movie.COMPANYS;
  newMovie: Movie;
  
  file: File;
  errors: any[] = [];
  
  constructor(private movieService: MovieService, private afStorage: AngularFireStorage,
    private router: Router) { }

  ngOnInit() {
    this.newMovie = new Movie();
  }
  createMovie() {
  
    this.movieService.createMovie(this.newMovie).subscribe(
      (movie: Movie) => {
        this.router.navigate([`/movies`]);
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors;
        console.log(this.errors[0].detail);
      })
  }
 
  async handleImageChange(event){
    this.file=event.target.files[0];
      const filePath = `${this.file.name}`;    //path at which image will be stored in the firebase storage
      const snap = await this.afStorage.upload(filePath, this.file);    //upload task
      this.getUrl(snap);
    } 
  
    
    private async getUrl(snap: firebase.storage.UploadTaskSnapshot) {
      const url = await snap.ref.getDownloadURL();
      this.newMovie.imageUrl = url;  //store the URL
      console.log(this.newMovie.imageUrl );
    }

    
    
  }
  /*
  private async getUrl(snap: firebase.storage.UploadTaskSnapshot) {
    const url = await snap.ref.getDownloadURL();
    this.newMovie.imageUrl = url;  //store the URL
    console.log(this.newMovie.imageUrl);
  }*/

