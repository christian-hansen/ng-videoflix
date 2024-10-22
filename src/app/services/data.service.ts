import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  email!: string;
  username!: string;
  selectedVideo: any;
  prevSelectedVideo: any;

  private videosUrl = environment.baseUrl + '/videos/'; // API base URL
  private genresUrl = environment.baseUrl + '/genres/'; // API base URL
  private authToken = 'Token ' + localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  private setHeaders() {
    return new HttpHeaders().set('Authorization', this.authToken);
  }

  private handleError(error: any) {
    console.error('Error:', error);
    return throwError(error);
  }
  //Load all videos
  loadVideos(): Observable<any> {
    this.loadAuthToken();
    return this.http
      .get<any>(this.videosUrl, { headers: this.setHeaders() })
      .pipe(catchError(this.handleError));
  }

  //Load all genres
  loadGenres(): Observable<any> {
    this.loadAuthToken();
    return this.http
      .get<any>(this.genresUrl, { headers: this.setHeaders() })
      .pipe(catchError(this.handleError));
  }

  getVideoById(id: number): Observable<any> {
    this.loadAuthToken();
    let singleVideoUrl = this.videosUrl + id;    
    return this.http
      .get<any>(singleVideoUrl, { headers: this.setHeaders() })
      .pipe(catchError(this.handleError));
  }

  saveVideoTimePlayed(time: string) {
    let timePlayed = time;
    console.log(timePlayed) //TODO store in database
  }

  loadAuthToken() {
    this.authToken = 'Token ' + localStorage.getItem('token');
  }
}
