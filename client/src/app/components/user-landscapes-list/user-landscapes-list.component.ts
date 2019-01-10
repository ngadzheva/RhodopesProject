import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-landscapes-list',
  templateUrl: './user-landscapes-list.component.html',
  styleUrls: ['./user-landscapes-list.component.css']
})
export class UserLandscapesListComponent implements OnInit, DoCheck {

  landscapes: string[];
  listType: string;
  header: string;

  constructor(private userService: UserService,private router: Router) { }

  ngOnInit() {
    this.loadLandsacepsList();
  }

  ngDoCheck() {
    if(this.listType != this.router.url.split('/')[2]){
      this.loadLandsacepsList();
    }
  }

  loadLandsacepsList() {
    this.listType = this.router.url.split('/')[2];
    
    this.userService.getLandscapes(this.listType).subscribe(response => {
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
    this.userService.removeLandscape(this.listType, landscape).subscribe(response => {
      if(response.success){
        this.landscapes = response.data;
      } else {
        this.router.navigateByUrl('/login');
      }
    });
  }
}
