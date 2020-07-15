import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  @Input() employee;

  @Input() action;

  @Output() closeEmitter = new EventEmitter();

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  closePopup() {
    this.closeEmitter.emit();
  }

  save() {
    let observable:Observable<any> = null;

    switch(this.action) {
      case "CREATE":
        observable = this.http.post<any>("/api/v1/employee", this.employee);
        break;
      case "EDIT":
        observable = this.http.put<any>("/api/v1/employee", this.employee);
        break;
    }

    observable.subscribe(
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
