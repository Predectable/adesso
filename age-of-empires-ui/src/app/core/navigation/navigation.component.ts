import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

// Model
import { Router as RouterModel } from './model/router.model';

// Constant
import { ROUTER } from './constant/routers';
import { filter } from 'rxjs/operators';

// UI
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: true,
  imports: [ButtonModule],
})
export class NavigationComponent implements OnInit {
  selectedRoute: RouterModel | undefined;
  ROUTERS: RouterModel[] = ROUTER;
  title: string = '';

  constructor(private router: Router, public activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.getCurrentPageInformation();
  }

  getCurrentPageInformation(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event.url) {
          if (event.url === '/') {
            this.getSelectedRouteByLink('home');
          } else {
            this.getSelectedRouteByLink(event.url.substring(1));
          }

          this.title = this.selectedRoute?.title!;
        }
      });
  }

  navigateTo(link: string): void {
    this.router.navigate([link]);
  }

  getSelectedRouteByLink(link: string) {
    this.selectedRoute = this.ROUTERS.find((r) => r.link === link);

    if (!this.selectedRoute) {
      this.selectedRoute = this.ROUTERS[0];
    }
  }
}
