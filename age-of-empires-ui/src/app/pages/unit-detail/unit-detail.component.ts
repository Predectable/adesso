import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSelectedUnit } from '../../state/selector';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Unit } from '../../model/unit.model';
import { Router } from '@angular/router';

@Component({
  selector: 'unit-detail',
  templateUrl: './unit-detail.component.html',
  styleUrls: ['./unit-detail.component.scss'],
  standalone: true,
})
export class UnitDetailComponent implements OnInit {
  unit: Unit | undefined;
  constructor(private store: Store, private router: Router) {
    this.getSelectedUnit();
  }

  ngOnInit(): void {}

  getSelectedUnit() {
    this.store
      .select(selectSelectedUnit)
      .pipe(takeUntilDestroyed())
      .subscribe((res) => {
        this.unit = res;

        if (!this.unit) {
          this.router.navigate(['/unit']);
        }
      });
  }

  filterCost(type: string) {
    if (this.unit) {
      return this.unit.costs.find((c) => c.resourceType.name === type)?.amount;
    }

    return null;
  }
}
