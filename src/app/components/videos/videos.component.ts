import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.scss',
})
export class VideosComponent {
  isLoading: boolean = false;
  videos: any[] = [];
  genres: string[] = [];
  genre1: any[] = [];
  public baseURL: string = 'http://localhost:8000';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadGenres();
    this.loadVideos();
  }

  loadGenres() {
    this.isLoading = true;
    this.dataService.loadGenres().subscribe((genres: any[]) => {
      this.genres = genres.map((genre) => genre.name); // Extract the name of each genre
      console.log('this.genres', this.genres);
      this.isLoading = false;
    });
  }

  loadVideos() {
    this.isLoading = true;
    this.dataService.loadVideos().subscribe((videos: any[]) => {
      this.videos = videos.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      console.log('this.videos', this.videos);
      this.isLoading = false;
    });
  }

  filterVideosByGenre(genre: string): any[] {
    return this.videos.filter((video) => video.genre === genre);
  }

  public loadVideo(id: number) {
    console.log('Loading video with ID:', id);
    // TODO Implement video loading logic here
  }
}
