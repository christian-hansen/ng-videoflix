import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

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
  public hostURL: string = environment.hostUrl;
  prevSelectedVideo: any;
  @ViewChild('videoRowContainer') videoRowContainer!: ElementRef;

  constructor(public dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.loadGenres();
    this.loadVideos();    
    this.checkScreenWidth();
  }


  loadGenres() {
    this.isLoading = true;
    this.dataService.loadGenres().subscribe((genres: any[]) => {
      // Sort genres by id before mapping to extract the names
      const sortedGenres = genres.sort((a, b) => a.id - b.id);
      this.genres = sortedGenres.map((genre) => genre.name); // Extract the name of each genre sorted by id
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

  ngAfterViewInit() {
    const container = this.videoRowContainer.nativeElement;
    let isDown = false;
    let startX: number;
    let scrollLeft: number;
  
    container.addEventListener('mousedown', (e: MouseEvent) => {
      isDown = true;
      container.classList.add('active');
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });
  
    container.addEventListener('mouseleave', () => {
      isDown = false;
      container.classList.remove('active');
    });
  
    container.addEventListener('mouseup', () => {
      isDown = false;
      container.classList.remove('active');
    });
  
    container.addEventListener('mousemove', (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2; // Scroll-fast multiplier
      container.scrollLeft = scrollLeft - walk;
    });
  }
}
