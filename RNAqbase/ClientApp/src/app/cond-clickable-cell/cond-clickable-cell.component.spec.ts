import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondClickableCellComponent } from './cond-clickable-cell.component';

describe('CondClickableCellComponent', () => {
  let component: CondClickableCellComponent;
  let fixture: ComponentFixture<CondClickableCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondClickableCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondClickableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
