import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-landscapes-list',
  templateUrl: './user-landscapes-list.component.html',
  styleUrls: ['./user-landscapes-list.component.css']
})
export class UserLandscapesListComponent implements OnInit, DoCheck, OnDestroy {

  landscapes: string[];
  listType: string;
  header: string;
  landmarksSubscription: Subscription;
  removeSubscription: Subscription;

  constructor(private userService: UserService,private router: Router) { }

  ngOnInit() {
    this.loadLandsacepsList();
  }

  ngDoCheck() {
    if(this.listType != this.router.url.split('/')[2]){
      this.loadLandsacepsList();
    }
  }

  ngOnDestroy() {
    this.landmarksSubscription.unsubscribe();

    if(this.removeSubscription) {
      this.removeSubscription.unsubscribe();
    }
  }

  loadLandsacepsList() {
    this.listType = this.router.url.split('/')[2];
    
    this.landmarksSubscription = this.userService.getLandscapes(this.listType).subscribe(response => {
      if(response.success){
        this.landscapes = response.data;
      } else {
        this.router.navigateByUrl('/login');
      }
    });
    
    if(this.listType === 'favorite'){
      this.header = 'Любими';
    } else if(this.listType === 'visited'){
      this.header = 'Посетени';
    } else if(this.listType === 'wantToVisit'){
      this.header = 'Искам да посетя';
    }
  }

  deleteLandscape(landscape: string){
    this.removeSubscription = this.userService.removeLandscape(this.listType, landscape).subscribe(response => {
      if(response.success){
        this.landscapes = response.data;
      } 
    }, error => {
      this.router.navigateByUrl('/login');
    });
  }
}
