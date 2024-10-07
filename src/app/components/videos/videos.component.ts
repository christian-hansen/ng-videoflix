import { Component, HostListener } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

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

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadGenres();
    this.loadVideos();    
    this.checkScreenWidth();
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
      this.selectVideo(this.videos[0])
      console.log("this.selectedvideo", this.selectedVideo);
      
      this.isLoading = false;
    });
  }

  filterVideosByGenre(genre: string): any[] {
    return this.videos.filter((video) => video.genre === genre);
  }

  public loadVideo(video: any) {
    console.log('Selected video with ID:', video);
    this.selectVideo(video)
  }

  loadVideoPlayer(video: any) {
    console.log(video);
    //TODO load video into videoplayer
  }

  closeSelectedVideo() {
    this.selectedVideo = undefined;
    console.log(this.selectedVideo);
    }

  selectVideo(video:any) {
    this.selectedVideo = video;
    this.prevSelectedVideo = video;
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
    if(this.selectedVideo === undefined) {
      this.selectVideo(this.prevSelectedVideo)      
    } 
  }
}
