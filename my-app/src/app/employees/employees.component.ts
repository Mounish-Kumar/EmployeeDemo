import { Component, OnInit } from '@angular/core';
import { HttpService } from './../core/http.service';
import HttpRequest from './../core/http-request';
import HttpMethod from './../core/http-method.enum';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  showPopup:boolean;

  selectedEmployee;

  popupAction:string;

  employees = [];

  // employees = [
  //   { id: 1, firstName: "Mounish Kumar", lastName: "V", email: "mounish@example.com", phone: "99999 99999", address: "Perumbakkam", designation: "Developer", level: "L1" },
  //   { id: 2, firstName: "Deepan", lastName: "V", email: "deeps@example.com", phone: "99999 99999", address: "Madipakkam", designation: "Manager", level: "L4" },
  //   { id: 3, firstName: "Shan", lastName: "V", email: "shan@example.com", phone: "99999 99999", address: "Velacherry", designation: "Lead", level: "L3" }
  // ];

  constructor(private httpService:HttpService) { }

  ngOnInit(): void {
    this.searchEmployees();
  }

  searchEmployees() {
    const request = new HttpRequest("/api/v1/employee", HttpMethod.GET);
    this.httpService.callService(request)
    .subscribe(
      response => {
        this.employees = response && response.employeeList
      },
      error => {
        alert(error && error.message);
      }
    );
  }

  createEmployee() {
    this.selectedEmployee = {};
    this.popupAction = "CREATE";
    this.showPopup = true;
  }

  viewEmployee(emp) {
    this.selectedEmployee = { ...emp };
    this.popupAction = "VIEW";
    this.showPopup = true;
  }

  editEmployee(emp) {
    this.selectedEmployee = { ...emp };
    this.popupAction = "EDIT";
    this.showPopup = true;
  }

  deleteEmployee(emp) {
    const request = new HttpRequest(`/api/v1/employee/${emp.id}`, HttpMethod.DELETE);
    this.httpService.callService(request)
    .subscribe(
      response => {
        alert(response && response.message);
        this.searchEmployees();
      },
      error => {
        alert(error && error.message);
      }
    );
  }

  closeEmployeeDetailPopup(search?) {
    this.showPopup = false;
    if(search) {
      this.searchEmployees();
    }
  }

}
