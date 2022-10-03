import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeCellComponent } from './attribute-cell.component';

describe('AttributeCellComponent', () => {
  let component: AttributeCellComponent;
  let fixture: ComponentFixture<AttributeCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributeCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
