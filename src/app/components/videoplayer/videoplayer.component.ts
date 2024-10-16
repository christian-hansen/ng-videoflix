import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-videoplayer',
  standalone: true,
  imports: [ButtonModule, ToastModule, RippleModule],
  providers: [MessageService],
  templateUrl: './videoplayer.component.html',
  styleUrl: './videoplayer.component.scss'
})
export class VideoplayerComponent {
  videoId: any;
  player: any;
  public baseURL: string = 'http://localhost:8000';
  qualities = ['360p', '720p', '1080p']; // List of video quality options
  showQualityMenu = false;
  videoData: any = {
    created_at
    : 
    "2024-10-07",
    description
    : 
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et e",
    genre
    : 
    "Science-Fiction",
    id
    : 
    11,
    thumbnail_file
    : 
    "/media/thumbnails/scifi01.jpeg",
    title
    : 
    "Space Combat",
    video_file
    : 
    "/media/videos/scifi01.mp4",
    video_file_360p
    : 
    "/media/videos/scifi01_360p.mp4",
    video_file_720p
    : 
    "/media/videos/scifi01_720p.mp4",
    video_file_1080p
    : 
    "/media/videos/scifi01_1080p.mp4"
  }

  constructor(private route: ActivatedRoute, private data: DataService, private messageService: MessageService) {}

  ngOnInit(): void {
    
    this.videoId = this.route.snapshot.paramMap.get('videoId');
    console.log(this.route.snapshot);
    console.log(this.videoId);
    

    this.loadVideoData();

  }

  //TODO
  loadVideoData() {
    console.log(this.videoData);

    this.selectQuality(this.qualities[1]); // Pre-select default quality (720p)
  }

  openSelectQualityMenu(event: MouseEvent) {
    this.showQualityMenu = true;
    event.stopPropagation(); // Prevents closing the menu immediately
  }

  onContainerClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;

    // Check if the click is outside the video-quality-menu
    if (!clickedElement.closest('.video-quality-menu')) {
      this.showQualityMenu = false;
    }
  }

  selectQuality(option: string) {
    const qualityMap: { [key: string]: string } = {
      '120p': this.baseURL + this.videoData.video_file_120p,
      '360p': this.baseURL + this.videoData.video_file_360p,
      '720p': this.baseURL + this.videoData.video_file_720p,
      '1080p': this.baseURL + this.videoData.video_file_1080p,
    };
  
    const selectedQuality = qualityMap[option];
  
    if (selectedQuality) {
      this.showQualityMenu = false;
      console.log(selectedQuality);
  
      const videoPlayer = document.getElementById('video-player') as HTMLVideoElement;
  
      if (videoPlayer) {
        const currentTime = videoPlayer.currentTime; // Save current playback time
        videoPlayer.src = selectedQuality;
        videoPlayer.load();
        
        // Once the video is loaded, set the current time back and play the video
        videoPlayer.onloadeddata = () => {
          videoPlayer.currentTime = currentTime; // Restore the playback time
          videoPlayer.play(); // Continue playing from the saved position
        };
      }
      this.showQualityChangeSuccess(option)
    }
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }

  showQualityChangeSuccess(input: string) {
    this.messageService.add({ severity: 'secondary', summary: "Settings updated", detail: `Video quality changed to ${input}` });
}

}
