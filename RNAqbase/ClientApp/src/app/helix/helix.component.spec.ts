import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelixComponent } from './helix.component';

describe('HelixComponent', () => {
  let component: HelixComponent;
  let fixture: ComponentFixture<HelixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
