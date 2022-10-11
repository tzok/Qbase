import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondCellComponent } from './cond-cell.component';

describe('CondCellComponent', () => {
  let component: CondCellComponent;
  let fixture: ComponentFixture<CondCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
