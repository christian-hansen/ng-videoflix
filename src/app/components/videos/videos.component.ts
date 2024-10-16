import { Component, HostListener } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.scss',
})
export class VideosComponent {
  isLoading: boolean = false;
  videos: any[] = [];
  public genres: string[] = [];
  public baseURL: string = 'http://localhost:8000';
  selectedVideo: any;
  prevSelectedVideo: any;

  constructor(public dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.loadGenres();
    this.loadVideos();    
    this.checkScreenWidth();
  }


  loadGenres() {
    this.isLoading = true;
    this.dataService.loadGenres().subscribe((genres: any[]) => {
      this.genres = genres.map((genre) => genre.name); // Extract the name of each genre
      // console.log('this.genres', this.genres);
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
      // console.log('this.videos', this.videos);
      if (this.dataService.prevSelectedVideo === undefined) {
        this.selectVideo(this.videos[0])
      } else {
        this.selectVideo(this.dataService.prevSelectedVideo)
      }
      // console.log("this.selectedvideo", this.selectedVideo);
      
      this.isLoading = false;
    });
  }

  filterVideosByGenre(genre: string): any[] {
    return this.videos.filter((video) => video.genre === genre);
  }

  public loadVideo(video: any) {
    // console.log('Selected video with ID:', video);
    this.selectVideo(video)
  }

  loadVideoPlayer(video: any) {
    this.router.navigateByUrl(`/videos/${video}`);
  }

  closeSelectedVideo() {
    this.dataService.selectedVideo = undefined;
    }

  selectVideo(video:any) {
    this.dataService.selectedVideo = video;
    this.dataService.prevSelectedVideo = video;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenWidth();
  }

  checkScreenWidth(): void {
    const screenWidth = window.innerWidth;
    if (screenWidth > 400) {
      this.reloadPrevSelectedVideo();
    }
  }

  reloadPrevSelectedVideo(): void {
    if(this.dataService.selectedVideo === undefined) {
      this.selectVideo(this.dataService.prevSelectedVideo)      
    } 
  }
}
