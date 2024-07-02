import { Component, OnInit } from '@angular/core';
import { AgeComponent } from '../../common/age/age.component';
import { CostComponent } from '../../common/cost/cost.component';
import { CostOutput } from '../../common/cost/model/cost-output.model';
import { ApiService } from '../../service/api.service';
import { finalize } from 'rxjs';
import { Unit } from '../../model/unit.model';
import { API_MAP } from '../../service/api.map';
import { ToastrService } from '../../service/toastr.service';
import { FilterUnit } from '../../model/filter-unit.model';
import { TableModule } from 'primeng/table';
import { Store } from '@ngrx/store';
import { setSelectedUnit } from '../../state/action';
import { Router } from '@angular/router';

@Component({
  selector: 'units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss'],
  standalone: true,
  imports: [AgeComponent, CostComponent, TableModule],
})
export class UnitsComponent implements OnInit {
  selectedAgeId: number | undefined;
  selectedCosts: CostOutput[] | undefined;
  units: Unit[] = [];
  selectedUnit: Unit | undefined;
  constructor(
    private apiService: ApiService,
    private toastrService: ToastrService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onAgeComponentReady() {
    console.log('Age component ready');
  }

  onAgeChange($event: number) {
    this.selectedAgeId = $event;

    this.filterUnits();
  }

  onResourceChange($event: CostOutput[]) {
    this.selectedCosts = $event;

    this.filterUnits();
  }

  filterUnits() {
    const body = new FilterUnit();

    if (this.selectedAgeId) {
      body.ageId = this.selectedAgeId;
    }

    if (this.selectedCosts && this.selectedCosts.length > 0) {
      body.resource = this.selectedCosts!;
    }

    this.apiService
      .post<Unit[]>(API_MAP.getUnits, body)
      .pipe(finalize(() => {}))
      .subscribe(
        (res) => {
          res && (this.units = res);

          if (this.units.length === 0) {
            this.toastrService.showInfo(
              'Info',
              'Data not found according to current filters.'
            );
          }
        },
        (err) => {
          this.toastrService.showError(
            'Error',
            'Error occured when getting the units.'
          );
        }
      );
  }

  onRowSelect() {
    this.store.dispatch(setSelectedUnit({ unit: this.selectedUnit }));
    this.router.navigate(['/unit/detail']);
  }
}
