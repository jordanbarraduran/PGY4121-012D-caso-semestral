import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenerarPage } from './generar.page';

describe('GenerarPage', () => {
  let component: GenerarPage;
  let fixture: ComponentFixture<GenerarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
