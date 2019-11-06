import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './movie.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { MovieListComponent } from './movie-list/movie-list.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';

const routes: Routes = [
  { path: 'movies',
    component: MovieComponent,
    children: [
    	{ path: '', component: MovieListComponent },
      { path: 'new', component: MovieCreateComponent  },
      { path: ':movieId/edit', component: MovieEditComponent },
    
    ]
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBU5EpHIpr_joPyKjBXXLG_RlSRkhh_oQ8",
      authDomain: "movieapp-f8960.firebaseapp.com",
    
      projectId: "movieapp-f8960",
      storageBucket: "movieapp-f8960.appspot.com",
   
    }),
    AngularFireStorageModule,

    

  ],
  declarations: [MovieComponent, 
    MovieEditComponent,
     MovieCreateComponent,
     MovieListComponent,
   
  ]
})
export class MovieModule { }
