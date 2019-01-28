import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLandscapesListComponent } from './user-landscapes-list.component';

describe('UserLandscapesListComponent', () => {
  let component: UserLandscapesListComponent;
  let fixture: ComponentFixture<UserLandscapesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLandscapesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLandscapesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
