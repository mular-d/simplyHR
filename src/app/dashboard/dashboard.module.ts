import { JobFormComponent } from './containers/job-form/job-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { CandidatesComponent } from './components/candidates/candidates.component';
import { JobInfoComponent } from './components/job-info/job-info.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NavbarWrapperComponent } from './navbar/navbar-wrapper/navbar-wrapper.component';

@NgModule({
  declarations: [
    NavbarWrapperComponent,
    DashboardComponent, 
    JobInfoComponent, 
    JobsComponent, 
    JobFormComponent,
    EmployeesComponent, 
    EmployeesComponent, 
    DepartmentsComponent, 
    CandidatesComponent
  ],
  imports: [
    DashboardRoutingModule,
    CommonModule,

    // NG Material Modules
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule
  ]
})
export class DashboardModule { }