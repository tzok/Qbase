import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadruplexTableComponent } from './quadruplex-table.component';

describe('QuadruplexTableComponent', () => {
  let component: QuadruplexTableComponent;
  let fixture: ComponentFixture<QuadruplexTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuadruplexTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuadruplexTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
