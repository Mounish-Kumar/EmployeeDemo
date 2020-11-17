import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import HttpRequest from 'src/app/core/http-request';
import { HttpService } from 'src/app/core/http.service';
import HttpMethod from './../../core/http-method.enum';
import { AppService } from './../../core/app.service';
import { finalize } from 'rxjs/operators';
import MessageType from 'src/app/core/message-type.enum';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  @Input() employee;

  form;

  @Input() action;

  @Output() closeEmitter = new EventEmitter();

  constructor(private formBuilder:FormBuilder, public app:AppService, public httpService:HttpService) {
    this.employee = {};
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [{value: this.employee.id, disabled: true}],
      firstName: [{value: this.employee.firstName, disabled: this.action==='VIEW'}, [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]*$')
      ]],
      lastName: [{value: this.employee.lastName, disabled: this.action==='VIEW'},
        Validators.pattern('^[a-zA-Z ]*$')],
      email: [{value: this.employee.email, disabled: this.action==='VIEW'}, [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]+\.[a-zA-Z0-9]$')
      ]],
      phone: [{value: this.employee.phone, disabled: this.action==='VIEW'}, [
        Validators.required,
        Validators.pattern('^[0-9 ]*$')
      ]],
      address: [{value: this.employee.address, disabled: this.action==='VIEW'}],
      dob: [{value: this.employee.dob, disabled: this.action==='VIEW'}],
      designation: [{value: this.employee.designation, disabled: this.action==='VIEW'}],
      level: [{value: this.employee.level, disabled: this.action==='VIEW'}]
    });
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
    const request = new HttpRequest("/api/v1/employee", httpMethod, this.form.value);

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
