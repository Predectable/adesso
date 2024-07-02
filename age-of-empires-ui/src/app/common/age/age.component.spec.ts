import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of, throwError } from 'rxjs';
import { AgeComponent } from './age.component';
import { ApiService } from '../../service/api.service';
import { ToastrService } from '../../service/toastr.service';
import { selectAges } from '../../state/selector';
import { Age } from '../../model/age.model';
import { API_MAP } from '../../service/api.map';

describe('AgeComponent', () => {
  let component: AgeComponent;
  let fixture: ComponentFixture<AgeComponent>;
  let mockStore: MockStore;
  let apiService: jasmine.SpyObj<ApiService>;
  let toastrService: jasmine.SpyObj<ToastrService>;

  const initialState = { ages: [] };
  const mockAges: Age[] = [
    { id: 1, name: 'Dark' },
    { id: 2, name: 'Imperial' },
  ];

  beforeEach(async () => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    toastrService = jasmine.createSpyObj('ToastrService', ['showError']);

    await TestBed.configureTestingModule({
      imports: [AgeComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: ApiService, useValue: apiService },
        { provide: ToastrService, useValue: toastrService },
      ],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AgeComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAgesFromStore in the constructor', () => {
    spyOn(AgeComponent.prototype, 'getAgesFromStore').and.callThrough();
    fixture = TestBed.createComponent(AgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.getAgesFromStore).toHaveBeenCalled();
  });

  it('should get ages from API and store them', () => {
    mockStore.overrideSelector(selectAges, []);
    apiService.get.and.returnValue(of(mockAges));
    component.getAges();
    expect(apiService.get).toHaveBeenCalledWith(API_MAP.getAges);
    expect(component.ages.length).toBe(3); // Includes 'All' option
  });

  it('should show error message if API call fails', () => {
    apiService.get.and.returnValue(throwError('Error'));
    component.getAges();
    expect(toastrService.showError).toHaveBeenCalledWith(
      'Error',
      'Error occured when getting the ages.'
    );
  });

  it('should call triggerAgeOutput on age value change', () => {
    spyOn(component, 'triggerAgeOutput');
    component.onAgeValueChange();
    expect(component.triggerAgeOutput).toHaveBeenCalled();
  });
});
