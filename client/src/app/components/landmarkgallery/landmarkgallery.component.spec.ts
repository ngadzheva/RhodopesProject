import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandmarkgalleryComponent } from './landmarkgallery.component';

describe('LandmarkgalleryComponent', () => {
  let component: LandmarkgalleryComponent;
  let fixture: ComponentFixture<LandmarkgalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandmarkgalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandmarkgalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
