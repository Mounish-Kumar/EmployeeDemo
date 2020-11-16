import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import HttpRequest from 'src/app/core/http-request';
import { HttpService } from 'src/app/core/http.service';
import HttpMethod from './../../core/http-method.enum';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  @Input() employee;

  @Input() action;

  @Output() closeEmitter = new EventEmitter();

  constructor(private httpService:HttpService) {
    this.employee = {};
  }

  ngOnInit(): void {
  }

  closePopup() {
    this.closeEmitter.emit();
  }

  save() {
    let httpMethod:HttpMethod = null;
    switch(this.action) {
      case "CREATE":
        httpMethod = HttpMethod.POST;
        break;
      case "EDIT":
        httpMethod = HttpMethod.PUT;
        break;
    }

    const request = new HttpRequest("/api/v1/employee", httpMethod, this.employee);
    this.httpService.callService(request)
    .subscribe(
      response => {
        alert(response && response.message);
        this.closeEmitter.emit(true);
      },
      error => {
        alert(error && error.message);
      }
    );
  }

}
