import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { debounceTime, fromEvent } from 'rxjs';


@Component({
  selector: 'app-videoplayer',
  standalone: true,
  imports: [ButtonModule, ToastModule, RippleModule, CommonModule],
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
  screenWidth: number = window.innerWidth;
  currentScreenWidthRange: string = ''; // To track the current screen width range
  videoData: any;
  isLoading: boolean = false;
  initialLoad: boolean = true;

  constructor(private route: ActivatedRoute, private data: DataService, private messageService: MessageService, private router: Router) {}

  ngOnInit(): void { 
    // this.addScreenWidthResizeListening();
    this.videoId = this.route.snapshot.paramMap.get('videoId');
    this.loadVideoData(this.videoId);
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }

  //TODO needs fixing as different videos appear when resizing
  addScreenWidthResizeListening() {
    fromEvent(window, 'resize')
    .pipe(
      debounceTime(300) // Adjust the debounce time as needed
    )
    .subscribe((event: any) => {
      this.screenWidth = window.innerWidth;
      
      this.checkScreenWidth();
    });
  }

  loadVideoData(videoId: number) {
    // console.log("loadvideodata()");
    
    this.data.getVideoById(videoId).subscribe(video => {
      setTimeout(() => {
      this.isLoading = true;
      this.videoData = video;
        
        // this.checkScreenWidth();   
        // this.loadVideoTimePlayed();   
      }, 500);
      this.isLoading = false;
    });
  }

  loadVideoTimePlayed() {
    let currentTime = localStorage.getItem("videoPlaybackTime") //TODO load from database instead
    let loadedTime = parseFloat(currentTime!)
    let expectingZero = loadedTime === 0;
    // console.log("expectingZero", expectingZero);
    
    // console.log(loadedTime);
    const videoPlayer = document.getElementById('video-player') as HTMLVideoElement;
    
    if (videoPlayer) {
      videoPlayer.load();
      // Once the video is loaded, set the current time back and play the video
      videoPlayer.onloadeddata = () => {
        videoPlayer.currentTime = loadedTime; // Restore the playback time
          if (videoPlayer.currentTime === 0 && !expectingZero) {
          // console.log("videoPlayer.currentTime loaded on loadVideoTimePlayed()", videoPlayer.currentTime);
          this.showErrorLoadingTime()
        }
        videoPlayer.play(); // Continue playing from the saved position
      };
    }
  }

  //TODO save to database
  saveVideoTimePlayedToDB() {
    const videoPlayer = document.getElementById('video-player') as HTMLVideoElement;
    const currentTime = videoPlayer.currentTime; // Save current playback time
    localStorage.setItem("videoPlaybackTime", currentTime.toString())
    // console.log(currentTime);
    this.data.saveVideoTimePlayed(currentTime.toString())
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
      '360p': this.baseURL + this.videoData.video_file_360p,
      '720p': this.baseURL + this.videoData.video_file_720p,
      '1080p': this.baseURL + this.videoData.video_file_1080p,
    };

  
    const selectedQualityFile = qualityMap[option];
  
    if (selectedQualityFile) {
      this.showQualityMenu = false;
      // console.log("selectedQualityFile loaded", selectedQualityFile);
      
      const videoPlayer = document.getElementById('video-player') as HTMLVideoElement;
  
      if (videoPlayer) {
        const currentTime = videoPlayer.currentTime; // Save current playback time
        videoPlayer.src = selectedQualityFile;
        videoPlayer.load();
        if (!this.initialLoad) {
          
          // Once the video is loaded, set the current time back and play the video
          videoPlayer.onloadeddata = () => {
            
            videoPlayer.currentTime = currentTime; // Restore the playback time
            videoPlayer.play(); // Continue playing from the saved position
          this.initialLoad = false;
          };
        } 

      }
    }
  }

  manualSelectQuality(option: string) {
    this.selectQuality(option)
    this.showQualityChangeSuccess(option)
  }

  showQualityChangeSuccess(input: string) {
    this.messageService.add({ severity: 'secondary', summary: "Settings updated", detail: `Video quality changed to ${input}` });
  }

  showErrorLoadingTime() {
    this.messageService.add({ severity: 'secondary', summary: "Loading error", detail: `There was an error loading the last time stamp`, key: 'bl', life: 10000 });
  }

directToDashboard() {
  // this.saveVideoTimePlayedToDB()
  //TODO remove settimeout
  setTimeout(() => {
    this.router.navigate(['/videos'])
  }, 500);
}

  // Method to check the screen width and perform actions based on breakpoints
  checkScreenWidth() {
    if (this.isSmallScreen()) {
      this.currentScreenWidthRange = 'below720';
      this.selectQuality('360p');
    } else if (this.isMediumScreen()) {
      this.currentScreenWidthRange = 'between720And1080';
      this.selectQuality('720p');
    } else if (this.isLargeScreen())  {
      this.currentScreenWidthRange = 'above1080';
      this.selectQuality('1080p');
    }
  }

  isSmallScreen() {
    return this.screenWidth < 720 && this.currentScreenWidthRange !== 'below720';
  }

  isMediumScreen() {
    return this.screenWidth >= 720 && this.screenWidth < 1280 && this.currentScreenWidthRange !== 'between720And1280';
  }

  isLargeScreen() {
    return this.screenWidth >= 1280 && this.currentScreenWidthRange !== 'above1280';
  }



}
