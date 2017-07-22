import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTimeComponent } from './input-time.component';

describe('InputTimeComponent', () => {
  let component: InputTimeComponent;
  let fixture: ComponentFixture<InputTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputTimeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the selected hour from the form control value', () => {
    const d = new Date();
    d.setHours(1);
    fixture.componentRef.instance.value = d;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelectorAll('.input-time__input')[0].value).toBe('1');
  });

  it('should render the selected minute from the form control value', () => {
    const d = new Date();
    d.setMinutes(1);
    fixture.componentRef.instance.value = d;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelectorAll('.input-time__input')[1].value).toBe('1');
  });

  it('should render the selected period from the form control value', () => {
    const d = new Date();
    d.setHours(12);
    fixture.componentRef.instance.value = d;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelectorAll('.input-time__input')[2].value).toBe('pm');

    d.setHours(1);
    fixture.componentRef.instance.value = d;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelectorAll('.input-time__input')[2].value).toBe('am');
  });
});
