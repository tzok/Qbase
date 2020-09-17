import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeliceComponent } from './helice.component';

describe('HeliceComponent', () => {
  let component: HeliceComponent;
  let fixture: ComponentFixture<HeliceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeliceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeliceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
