import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';

@Component({
  standalone: true,
  imports: [CommonModule, ToastModule],
  selector: 'toast',
  template: '<p-toast></p-toast>',
})
export class ToastComponent {}
