import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLandscapeComponent } from './edit-landscape.component';

describe('EditLandscapeComponent', () => {
  let component: EditLandscapeComponent;
  let fixture: ComponentFixture<EditLandscapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLandscapeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLandscapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
