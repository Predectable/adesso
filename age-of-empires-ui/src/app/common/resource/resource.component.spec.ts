import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { SliderModule } from 'primeng/slider';
import { ResourceComponent } from './resource.component';
import { ResourceOutput } from './model/resource-output.model';

describe('ResourceComponent', () => {
  let component: ResourceComponent;
  let fixture: ComponentFixture<ResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxModule, SliderModule, FormsModule, ResourceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResourceComponent);
    component = fixture.componentInstance;
    component.label = 'Test Resource';
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event on slide change', () => {
    spyOn(component.onResourceChange, 'emit');
    component.rangeValues = [10, 50];
    component.onSlideChange();
    expect(component.onResourceChange.emit).toHaveBeenCalledWith(
      new ResourceOutput(component.checked, 10, 50)
    );
  });

  it('should emit event on checkbox change', () => {
    spyOn(component.onResourceChange, 'emit');
    component.checked = true;
    component.rangeValues = [20, 80];
    component.onCheckboxChange();
    expect(component.onResourceChange.emit).toHaveBeenCalledWith(
      new ResourceOutput(true, 20, 80)
    );
  });

  it('should have default values', () => {
    expect(component.checked).toBe(false);
    expect(component.label).toBe('Test Resource');
    expect(component.minValue).toBe(0);
    expect(component.maxValue).toBe(200);
    expect(component.rangeValues).toEqual([0, 100]);
  });
});
