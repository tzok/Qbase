
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TetradTabelComponent } from './tetrad-tabel.component';

describe('TetradTabelComponent', () => {
  let component: TetradTabelComponent;
  let fixture: ComponentFixture<TetradTabelComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TetradTabelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TetradTabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
