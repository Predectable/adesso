import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { SliderModule } from 'primeng/slider';
import { ResourceOutput } from './model/resource-output.model';

@Component({
  selector: 'resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss'],
  standalone: true,
  imports: [CheckboxModule, SliderModule, FormsModule],
})
export class ResourceComponent implements OnInit {
  checked: boolean = false;

  @Input({ required: true }) label: string = '';
  @Input() minValue: number = 0;
  @Input() maxValue: number = 200;

  rangeValues: number[] = [0, 100];

  @Output() onResourceChange = new EventEmitter<ResourceOutput>();

  constructor() {}

  ngOnInit(): void {}

  onSlideChange() {
    this.onResourceChange.emit(
      new ResourceOutput(this.checked, this.rangeValues[0], this.rangeValues[1])
    );
  }

  onCheckboxChange() {
    this.onResourceChange.emit(
      new ResourceOutput(this.checked, this.rangeValues[0], this.rangeValues[1])
    );
  }
}
