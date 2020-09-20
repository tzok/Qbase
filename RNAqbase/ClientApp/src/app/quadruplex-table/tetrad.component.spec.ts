import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TetradComponent } from './tetrad.component';

describe('TetradComponent', () => {
  let component: TetradComponent;
  let fixture: ComponentFixture<TetradComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TetradComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TetradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
