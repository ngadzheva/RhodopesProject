import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGalleryComponent } from './edit-gallery.component';

describe('EditGalleryComponent', () => {
  let component: EditGalleryComponent;
  let fixture: ComponentFixture<EditGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
