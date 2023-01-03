import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowCondAddableComponent } from './row-cond-addable.component';

describe('RowCondAddableComponent', () => {
  let component: RowCondAddableComponent;
  let fixture: ComponentFixture<RowCondAddableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowCondAddableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowCondAddableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
