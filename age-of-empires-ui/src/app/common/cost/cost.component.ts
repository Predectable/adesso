import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ResourceComponent } from '../resource/resource.component';
import { ApiService } from '../../service/api.service';
import { API_MAP } from '../../service/api.map';
import { Resource } from '../../model/resource.model';
import { finalize } from 'rxjs';
import { ToastrService } from '../../service/toastr.service';
import { CostOutput } from './model/cost-output.model';
import { ResourceOutput } from '../resource/model/resource-output.model';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { selectResources } from '../../state/selector';
import { setResources } from '../../state/action';

@Component({
  selector: 'cost',
  templateUrl: './cost.component.html',
  styleUrls: ['./cost.component.scss'],
  standalone: true,
  imports: [ResourceComponent],
})
export class CostComponent implements OnInit {
  resources: Resource[] = [];

  selectedResources: CostOutput[] = [];
  @Output() onComponentReady = new EventEmitter();
  @Output() onResourceChange = new EventEmitter();

  constructor(
    private apiService: ApiService,
    private toastrService: ToastrService,
    private store: Store
  ) {
    this.getResourcesFromStore();
  }

  ngOnInit(): void {}

  getResourcesFromStore() {
    this.store
      .select(selectResources)
      .pipe(takeUntilDestroyed())
      .subscribe((res) => {
        if (res && this.resources.length === 0) {
          this.resources = res;
        } else if (this.resources.length === 0) {
          this.getResources();
        }
      });
  }

  getResources(): void {
    this.apiService
      .get<Resource[]>(API_MAP.getResources)
      .pipe(
        finalize(() => {
          this.onComponentReady.emit();
        })
      )
      .subscribe(
        (res) => {
          if (res) {
            this.resources = res;
            this.store.dispatch(setResources({ resources: this.resources }));
          }
        },
        (err) => {
          this.toastrService.showError(
            'Error',
            'Error occured when getting the resources.'
          );
        }
      );
  }

  onRangeChange($event: ResourceOutput, resourceId: number) {
    const resource = this.selectedResources.find(
      (r) => r.resourceTypeId === resourceId
    );

    if ($event.enable) {
      this.changeResourceData(resource!, $event, resourceId);
    } else {
      this.filterResourceData(resourceId);
    }

    this.onResourceChange.emit(this.selectedResources);
  }

  changeResourceData(
    resource: CostOutput | undefined,
    $event: ResourceOutput,
    resourceId: number
  ) {
    if (resource) {
      resource.minValue = $event.minValue;
      resource.maxValue = $event.maxValue;
    } else {
      this.selectedResources.push(
        new CostOutput(resourceId, $event.minValue, $event.maxValue)
      );
    }
  }

  filterResourceData(resourceId: number) {
    this.selectedResources = this.selectedResources.filter(
      (r) => r.resourceTypeId !== resourceId
    );
  }
}
