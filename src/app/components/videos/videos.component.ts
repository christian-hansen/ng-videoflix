import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
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
  videosDocumentaries: any[] = [];
  videosMusic: any[] = [];
  public baseURL: string = "http://localhost:8000"

  constructor(
    private auth: AuthService,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.loadVideos();

  }

  loadVideos() {
    this.isLoading = true;
    this.dataService.loadVideos().subscribe((videos: any[]) => {
      this.videos = videos;
      console.log('this.videos', this.videos);
      this.filterVideosByGenre();
      this.isLoading = false;
    });
  }

  public loadVideo(id: any) {
    console.log(id);
    //TODO
  }

  filterVideosByGenre(): void {
    // Filter videos by genre
    this.videosDocumentaries = this.videos.filter(video => video.genre === 'Documentary');
    console.log(this.videosDocumentaries);
    
    this.videosMusic = this.videos.filter(video => video.genre === 'Music');
    console.log(this.videosMusic);
    
  }
}
