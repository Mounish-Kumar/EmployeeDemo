import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeesComponent } from './employees/employees.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { LeaveTrackerComponent } from './leave-tracker/leave-tracker.component';


const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "employees", component: EmployeesComponent },
  { path: "attendance", component: AttendanceComponent },
  { path: "leave-tracker", component: LeaveTrackerComponent },
  { path: "**", redirectTo: "home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
