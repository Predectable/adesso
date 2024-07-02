import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadComponent: () =>
      import(`./pages/home/home.component`).then((c) => c.HomeComponent),
  },
  {
    path: 'unit',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        path: 'list',
        loadComponent: () =>
          import(`./pages/units/units.component`).then((c) => c.UnitsComponent),
      },
      {
        path: 'detail',
        loadComponent: () =>
          import(`./pages/unit-detail/unit-detail.component`).then(
            (c) => c.UnitDetailComponent
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'home' },
];
