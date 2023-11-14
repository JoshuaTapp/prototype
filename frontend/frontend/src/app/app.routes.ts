import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeDetailsComponent } from './home-details/home-details.component';
import { InspectionsComponent } from './inspections/inspections.component';
import { AuthComponent } from './auth/auth.component';
import { InspectionDetailsComponent } from './inspection-details/inspection-details.component';
import { WelcomeComponent } from './welcome/welcome.component';

export const routes: Routes = [
  {
    path: 'home-details/:homeId',
    title: 'Home Details',
    component: HomeDetailsComponent,
  },
  {
    path: 'inspection-details/:inspectionId',
    title: 'Inspection Details',
    component: InspectionDetailsComponent,
  },
  {
    path: 'auth',
    title: 'login',
    component: AuthComponent,
  },
  {
    path: 'inspections',
    title: 'Inspections Table',
    component: InspectionsComponent,
  },
  {
    path: '',
    title: 'Home',
    component: WelcomeComponent,
  },
];
