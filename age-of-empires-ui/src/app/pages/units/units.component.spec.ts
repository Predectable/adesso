import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of, throwError } from 'rxjs';
import { UnitsComponent } from './units.component';
import { AgeComponent } from '../../common/age/age.component';
import { CostComponent } from '../../common/cost/cost.component';
import { ApiService } from '../../service/api.service';
import { ToastrService } from '../../service/toastr.service';
import { Unit } from '../../model/unit.model';
import { CostOutput } from '../../common/cost/model/cost-output.model';
import { FilterUnit } from '../../model/filter-unit.model';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TableModule } from 'primeng/table';
import { setSelectedUnit } from '../../state/action';

describe('UnitsComponent', () => {
  let component: UnitsComponent;
  let fixture: ComponentFixture<UnitsComponent>;
  let mockStore: MockStore;
  let apiService: jasmine.SpyObj<ApiService>;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let router: Router;

  const mockUnits: Unit[] = [
    {
      id: 1,
      costs: [],
      uuid: '',
      buildTime: 0,
      reloadTime: 0,
      attackDelay: 0,
      movementRate: 0,
      lineOfSight: 0,
      hitPoints: 0,
      range: '',
      attack: 0,
      armor: '',
      accuracy: '',
      age: {
        id: 1,
        name: 'Dark',
      },
      expansion: {
        id: 1,
        name: 'Test',
      },
      unitType: {
        id: 1,
        name: 'Test',
        description: 'Test',
      },
    },
    {
      id: 2,
      costs: [],
      uuid: '',
      buildTime: 0,
      reloadTime: 0,
      attackDelay: 0,
      movementRate: 0,
      lineOfSight: 0,
      hitPoints: 0,
      range: '',
      attack: 0,
      armor: '',
      accuracy: '',
      age: {
        id: 1,
        name: 'Dark',
      },
      expansion: {
        id: 1,
        name: 'Test',
      },
      unitType: {
        id: 1,
        name: 'Test',
        description: 'Test',
      },
    },
  ];

  beforeEach(async () => {
    apiService = jasmine.createSpyObj('ApiService', ['post']);
    toastrService = jasmine.createSpyObj('ToastrService', [
      'showInfo',
      'showError',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        AgeComponent,
        CostComponent,
        TableModule,
        UnitsComponent,
      ],
      providers: [
        provideMockStore(),
        { provide: ApiService, useValue: apiService },
        { provide: ToastrService, useValue: toastrService },
      ],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(UnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call filterUnits on age change', () => {
    spyOn(component, 'filterUnits');
    component.onAgeChange(1);
    expect(component.selectedAgeId).toBe(1);
    expect(component.filterUnits).toHaveBeenCalled();
  });

  it('should call filterUnits on resource change', () => {
    const mockCostOutputs: CostOutput[] = [
      { resourceTypeId: 1, minValue: 10, maxValue: 20 },
    ];
    spyOn(component, 'filterUnits');
    component.onResourceChange(mockCostOutputs);
    expect(component.selectedCosts).toEqual(mockCostOutputs);
    expect(component.filterUnits).toHaveBeenCalled();
  });

  it('should show info message if no units found', () => {
    apiService.post.and.returnValue(of([]));
    component.filterUnits();
    expect(toastrService.showInfo).toHaveBeenCalledWith(
      'Info',
      'Data not found according to current filters.'
    );
  });

  it('should show error message if API call fails', () => {
    apiService.post.and.returnValue(throwError('Error'));
    component.filterUnits();
    expect(toastrService.showError).toHaveBeenCalledWith(
      'Error',
      'Error occured when getting the units.'
    );
  });
});
