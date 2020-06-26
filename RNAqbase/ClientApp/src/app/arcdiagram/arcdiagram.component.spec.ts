import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcdiagramComponent } from './arcdiagram.component';

describe('ArcdiagramComponent', () => {
  let component: ArcdiagramComponent;
  let fixture: ComponentFixture<ArcdiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArcdiagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArcdiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
