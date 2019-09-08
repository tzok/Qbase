import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Visualization3DComponent } from './visualization3-d.component';

describe('Visualization3DComponent', () => {
  let component: Visualization3DComponent;
  let fixture: ComponentFixture<Visualization3DComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Visualization3DComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Visualization3DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
