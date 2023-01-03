import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowCondNonaddableComponent } from './row-cond-nonaddable.component';

describe('RowCondNonaddableComponent', () => {
  let component: RowCondNonaddableComponent;
  let fixture: ComponentFixture<RowCondNonaddableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowCondNonaddableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowCondNonaddableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
