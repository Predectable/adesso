import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../navigation/navigation.component';
import { ToastComponent } from '../../common/toastr/toastr.component';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [RouterOutlet, NavigationComponent, ToastComponent],
})
export class LayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
