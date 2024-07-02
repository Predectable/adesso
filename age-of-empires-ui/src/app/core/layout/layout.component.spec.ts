import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationComponent } from '../navigation/navigation.component';
import { ToastComponent } from '../../common/toastr/toastr.component';
import { MessageService } from 'primeng/api';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        LayoutComponent,
        NavigationComponent,
        ToastComponent,
      ],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain NavigationComponent', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('navigation')).not.toBeNull();
  });

  it('should contain RouterOutlet', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });
});
