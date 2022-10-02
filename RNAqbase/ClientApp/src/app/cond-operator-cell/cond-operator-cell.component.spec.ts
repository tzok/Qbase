import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondOperatorCellComponent } from './cond-operator-cell.component';

describe('CondOperatorCellComponent', () => {
  let component: CondOperatorCellComponent;
  let fixture: ComponentFixture<CondOperatorCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondOperatorCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondOperatorCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
