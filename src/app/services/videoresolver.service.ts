import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoresolverService {

  constructor(private data: DataService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const videoId = route.params['videoId'];

    // Fetch video data using the service
    return this.data.getVideoById(videoId).pipe(
      map(video => {
        if (video) {
          return video;  // Return the video data if it exists
        } else {
          this.router.navigate(['/videos']);  // Redirect to /videos if the video does not exist
          return null;
        }
      }),
      catchError(() => {
        this.router.navigate(['/videos']);  // Handle any errors and redirect
        return of(null);
      })
    );
  }
}
