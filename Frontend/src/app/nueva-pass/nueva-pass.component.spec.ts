import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaPassComponent } from './nueva-pass.component';

describe('NuevaPassComponent', () => {
  let component: NuevaPassComponent;
  let fixture: ComponentFixture<NuevaPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaPassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
