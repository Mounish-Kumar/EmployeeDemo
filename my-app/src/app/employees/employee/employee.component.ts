import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import HttpRequest from 'src/app/core/http-request';
import { HttpService } from 'src/app/core/http.service';
import HttpMethod from './../../core/http-method.enum';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  @Input() employee;

  // form = new FormGroup({
  //   id: new FormControl(),
  //   firstName: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(3),
  //     Validators.pattern('^[a-zA-Z ]*$')
  //   ]),
  //   lastName: new FormControl('', Validators.pattern('^[a-zA-Z ]*$')),
  //   email: new FormControl('', [
  //     Validators.required,
  //     Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]+\.[a-zA-Z0-9]$')
  //   ]),
  //   phone: new FormControl('', [
  //     Validators.required,
  //     Validators.pattern('^[0-9 ]*$')
  //   ]),
  //   address: new FormControl(''),
  //   dob: new FormControl(''),
  //   designation: new FormControl(''),
  //   level: new FormControl('')
  // });
  form;

  @Input() action;

  @Output() closeEmitter = new EventEmitter();

  constructor(private httpService:HttpService, private formBuilder:FormBuilder) {
    this.employee = {};
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [this.employee.id],
      firstName: [this.employee.firstName, [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]*$')
      ]],
      lastName: [this.employee.lastName, Validators.pattern('^[a-zA-Z ]*$')],
      email: [this.employee.email, [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]+\.[a-zA-Z0-9]$')
      ]],
      phone: [this.employee.phone, [
        Validators.required,
        Validators.pattern('^[0-9 ]*$')
      ]],
      address: [this.employee.address],
      dob: [this.employee.dob],
      designation: [this.employee.designation],
      level: [this.employee.level]
    });
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

    const request = new HttpRequest("/api/v1/employee", httpMethod, this.form.value);
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
