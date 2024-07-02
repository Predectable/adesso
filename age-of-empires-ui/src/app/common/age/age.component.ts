import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ApiService } from '../../service/api.service';
import { API_MAP } from '../../service/api.map';
import { Age } from '../../model/age.model';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { ToastrService } from '../../service/toastr.service';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { selectAges } from '../../state/selector';
import { setAges } from '../../state/action';

@Component({
  selector: 'age',
  templateUrl: './age.component.html',
  styleUrls: ['./age.component.scss'],
  standalone: true,
  imports: [SelectButtonModule, FormsModule],
})
export class AgeComponent implements OnInit {
  ages: Age[] = [];
  selectedAgeId: number = 0;

  protected allOptions: Age = {
    id: 0,
    name: 'All',
  };

  @Output() onComponentReady = new EventEmitter();
  @Output() onAgeChange = new EventEmitter();

  constructor(
    private apiService: ApiService,
    private toastrService: ToastrService,
    private store: Store
  ) {
    this.getAgesFromStore();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.ages.length > 0 && this.triggerAgeOutput();
  }

  getAgesFromStore() {
    this.store
      .select(selectAges)
      .pipe(takeUntilDestroyed())
      .subscribe((res) => {
        if (res && this.ages.length === 0) {
          this.ages = res;
          this.onComponentReady.emit();
          this.triggerAgeOutput();
        } else if (this.ages.length === 0) {
          this.getAges();
        }
      });
  }

  getAges(): void {
    this.apiService
      .get<Age[]>(API_MAP.getAges)
      .pipe(
        finalize(() => {
          this.onComponentReady.emit();
          this.triggerAgeOutput();
        })
      )
      .subscribe(
        (res) => {
          res && (this.ages = res);
          this.ages.unshift(this.allOptions);
          this.store.dispatch(setAges({ ages: this.ages }));
        },
        (err) => {
          this.ages.unshift(this.allOptions);
          this.toastrService.showError(
            'Error',
            'Error occured when getting the ages.'
          );
        }
      );
  }

  onAgeValueChange() {
    this.triggerAgeOutput();
  }

  triggerAgeOutput() {
    this.onAgeChange.emit(this.selectedAgeId);
  }
}
