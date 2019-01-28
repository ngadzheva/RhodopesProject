import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RhodopesComponent } from './rhodopes.component';

describe('RhodopesComponent', () => {
  let component: RhodopesComponent;
  let fixture: ComponentFixture<RhodopesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RhodopesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RhodopesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
