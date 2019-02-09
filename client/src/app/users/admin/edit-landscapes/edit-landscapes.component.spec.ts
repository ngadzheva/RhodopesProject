import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLandscapesComponent } from './edit-landscapes.component';

describe('EditLandscapesComponent', () => {
  let component: EditLandscapesComponent;
  let fixture: ComponentFixture<EditLandscapesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLandscapesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLandscapesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
