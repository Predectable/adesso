import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationComponent } from './navigation.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { ROUTER } from './constant/routers';
import { ButtonModule } from 'primeng/button';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let router: Router;
  let routerEventsSubject: Subject<any>;

  beforeEach(async () => {
    routerEventsSubject = new Subject();

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        ButtonModule,
        NavigationComponent
      ],
      providers: [
        { provide: Router, useValue: { events: routerEventsSubject.asObservable(), navigate: jasmine.createSpy('navigate') }},
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the correct route information', () => {
    spyOn(component, 'getCurrentPageInformation').and.callThrough();
    component.ngOnInit();
    expect(component.getCurrentPageInformation).toHaveBeenCalled();
  });

  it('should get the correct route information on navigation end', () => {
    const testUrl = '/test';
    routerEventsSubject.next(new NavigationEnd(1, testUrl, testUrl));
    fixture.detectChanges();
    component.getCurrentPageInformation();
    component.title = component.selectedRoute?.title!;
    expect(component.selectedRoute?.link).toBe('home');
  });

  it('should navigate to the correct link', () => {
    const link = 'test-link';
    component.navigateTo(link);
    expect(router.navigate).toHaveBeenCalledWith([link]);
  });

  it('should get selected route by link', () => {
    const link = 'home';
    component.getSelectedRouteByLink(link);
    expect(component.selectedRoute?.link).toBe(link);
  });

  it('should default to first route if no match found', () => {
    component.getSelectedRouteByLink('non-existent-link');
    expect(component.selectedRoute).toBe(ROUTER[0]);
  });
});
