import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { CandidatesComponent } from './components/candidates/candidates.component';
import { DepartmentsComponent } from './components/departments/departments.component';

import { JobFormComponent } from './containers/job-form/job-form.component';

import { NavbarWrapperComponent } from './navbar/navbar-wrapper/navbar-wrapper.component';

const routes: Routes = [
  
  {
    path: '',
    component: NavbarWrapperComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'jobs',
        component: JobsComponent
      },
      {
        path: 'departments',
        component: DepartmentsComponent
      },
      {
        path: 'employees',
        component: EmployeesComponent
      },
      {
        path: 'candidates',
        component: CandidatesComponent
      },
      {
        path: 'job/:id',
        component: JobFormComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }