import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondSeqCellComponent } from './cond-seq-cell.component';

describe('CondSeqCellComponent', () => {
  let component: CondSeqCellComponent;
  let fixture: ComponentFixture<CondSeqCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondSeqCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondSeqCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
