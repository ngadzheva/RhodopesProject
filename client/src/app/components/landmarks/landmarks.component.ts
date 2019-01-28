import { Component, OnInit, DoCheck } from '@angular/core';
import { LandmarksService } from '../../services/landmarks.service';
import { Router } from '@angular/router';
import { Landmark } from '../../models/landmark.model';


@Component({
  selector: 'app-landmarks',
  templateUrl: './landmarks.component.html',
  styleUrls: ['./landmarks.component.css']
})
export class LandmarksComponent implements OnInit, DoCheck {
  landmarks: Landmark[];
  rhodopesPart: string;
  favorite: boolean;
  visited: boolean;
  wantToVisit: boolean;
  searchText: string;

  constructor(private landmarksService: LandmarksService, private router: Router) { 
    this.favorite = false;
    this.visited = false;
    this.wantToVisit = false;
  }

  ngOnInit() {
    this.loadLandscapes();
  }

  ngDoCheck() {
    if(this.rhodopesPart != this.router.url.split('/')[2]){
      this.loadLandscapes();
    }
  }

  loadLandscapes() {
    this.rhodopesPart = this.router.url.split('/')[2];

      this.landmarksService.getLandmarks(this.rhodopesPart)
        .subscribe(landmarks => this.landmarks = landmarks);
  }

  addLandscape(landscape: string, listType: string){
    this.landmarksService.addLandscape(this.rhodopesPart, landscape, listType).subscribe(response => {
      if(response.success){
        if(listType === 'favorite'){
          this.favorite = true;
        } else if(listType === 'visited'){
          this.visited = true;
        } else if(listType === 'wantToVisit'){
          this.wantToVisit = true;
        }
      } else {
        this.router.navigateByUrl('/login');
      }
    });
  }

  viewLandscape(landscape: string){
    this.router.navigateByUrl(`landscapes/${this.rhodopesPart}/${landscape}`);
  }
}
