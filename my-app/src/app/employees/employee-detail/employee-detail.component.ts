import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppService } from 'src/app/core/app.service';
import HttpRequest from 'src/app/core/http-request';
import { HttpService } from 'src/app/core/http.service';
import HttpMethod from './../../core/http-method.enum';
import { finalize } from 'rxjs/operators';
import MessageType from 'src/app/core/message-type.enum';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  @Input() employee;

  @Input() action;

  @Output() closeEmitter = new EventEmitter();

  constructor(private httpService:HttpService, private app:AppService) {
    this.employee = {};
  }

  ngOnInit(): void {
  }

  closePopup() {
    this.closeEmitter.emit();
  }

  save() {
    this.app.showLoader = true;

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
    .pipe(finalize(() => this.app.showLoader = false))
    .subscribe(
      response => {
        this.app.addMessage(response && response.message, MessageType.SUCCESS);
        this.closeEmitter.emit(true);
      },
      error => {
        this.app.addMessage(error && error.message, MessageType.ERROR);
      }
    );
  }

}
