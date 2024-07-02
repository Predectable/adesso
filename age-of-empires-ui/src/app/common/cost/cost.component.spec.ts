import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of, throwError } from 'rxjs';
import { CostComponent } from './cost.component';
import { ApiService } from '../../service/api.service';
import { ToastrService } from '../../service/toastr.service';
import { selectResources } from '../../state/selector';
import { Resource } from '../../model/resource.model';
import { CostOutput } from './model/cost-output.model';
import { ResourceOutput } from '../resource/model/resource-output.model';
import { API_MAP } from '../../service/api.map';

describe('CostComponent', () => {
  let component: CostComponent;
  let fixture: ComponentFixture<CostComponent>;
  let mockStore: MockStore;
  let apiService: jasmine.SpyObj<ApiService>;
  let toastrService: jasmine.SpyObj<ToastrService>;

  const initialState = { resources: [] };
  const mockResources: Resource[] = [
    { id: 1, name: 'Resource 1' },
    { id: 2, name: 'Resource 2' },
  ];

  beforeEach(async () => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    toastrService = jasmine.createSpyObj('ToastrService', ['showError']);

    await TestBed.configureTestingModule({
      imports: [CostComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: ApiService, useValue: apiService },
        { provide: ToastrService, useValue: toastrService },
      ],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);

    // `getResourcesFromStore` metodunu casusla sarmalayıp sonra bileşeni oluşturmalıyız
    spyOn(CostComponent.prototype, 'getResourcesFromStore').and.callThrough();

    fixture = TestBed.createComponent(CostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getResourcesFromStore on initialization', () => {
    expect(component.getResourcesFromStore).toHaveBeenCalled();
  });

  it('should get resources from API and store them', () => {
    mockStore.overrideSelector(selectResources, []);
    apiService.get.and.returnValue(of(mockResources));
    component.getResources();
    expect(apiService.get).toHaveBeenCalledWith(API_MAP.getResources);
    expect(component.resources.length).toBe(2);
  });

  it('should show error message if API call fails', () => {
    apiService.get.and.returnValue(throwError('Error'));
    component.getResources();
    expect(toastrService.showError).toHaveBeenCalledWith(
      'Error',
      'Error occured when getting the resources.'
    );
  });

  it('should call onResourceChange on range change', () => {
    const mockEvent: ResourceOutput = {
      enable: true,
      minValue: 10,
      maxValue: 50,
    };
    spyOn(component.onResourceChange, 'emit');
    component.onRangeChange(mockEvent, 1);
    expect(component.onResourceChange.emit).toHaveBeenCalled();
  });

  it('should change resource data on range change', () => {
    const mockEvent: ResourceOutput = {
      enable: true,
      minValue: 10,
      maxValue: 50,
    };
    component.changeResourceData(undefined, mockEvent, 1);
    expect(component.selectedResources.length).toBe(1);
    expect(component.selectedResources[0].resourceTypeId).toBe(1);
    expect(component.selectedResources[0].minValue).toBe(10);
    expect(component.selectedResources[0].maxValue).toBe(50);
  });

  it('should filter resource data on disable', () => {
    component.selectedResources = [
      new CostOutput(1, 10, 100),
      new CostOutput(2, 20, 200),
    ];
    component.filterResourceData(1);
    expect(component.selectedResources.length).toBe(1);
    expect(component.selectedResources[0].resourceTypeId).toBe(2);
  });
});
