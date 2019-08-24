import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadruplexComponent } from './quadruplex.component';

describe('QuadruplexComponent', () => {
  let component: QuadruplexComponent;
  let fixture: ComponentFixture<QuadruplexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuadruplexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuadruplexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
