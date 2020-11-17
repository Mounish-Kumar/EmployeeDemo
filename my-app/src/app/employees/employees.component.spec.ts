import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeesComponent } from './employees.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpService } from '../core/http.service';
import { By } from '@angular/platform-browser';
import { from, throwError } from 'rxjs';
import { AppService } from '../core/app.service';
import MessageType from '../core/message-type.enum';

describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ EmployeesComponent ],
      providers: [ HttpService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('searchEmployees', () => {
    let appService:AppService = null;
    let httpService:HttpService = null;

    beforeEach(() => {
      appService = TestBed.inject(AppService);
      httpService = TestBed.inject(HttpService);
    });
    
    it('should call httpService', () => {
      let callServiceSpy = spyOn(httpService, 'callService').and.callFake(() => from([]));
      component.searchEmployees();
      expect(callServiceSpy).toHaveBeenCalled();
    });
    
    it('should set response in employees',() => {
      let response = { employeeList: [ {name: "Mounish"}, {name: "Shan"} ] };
      let callServiceSpy = spyOn(httpService, 'callService').and.callFake(() => {
        return from([response]);
      });
      component.searchEmployees();
      expect(component.employees).toBe(response.employeeList);
    });

    it('should call addMessage on error',() => {
      let response = { message: "Failed!" };
      let callServiceSpy = spyOn(httpService, 'callService').and.returnValue(throwError(response));
      const addMessageSpy = spyOn(appService, 'addMessage');
      component.searchEmployees();
      expect(addMessageSpy).toHaveBeenCalledWith(response.message, MessageType.ERROR);
    });
  });

  it('createEmployee',() => {
    let de = fixture.debugElement.query(By.css('.btn'));
    let element:HTMLElement = de.nativeElement;
    element.click();
    expect(component.selectedEmployee).not.toBeNull();
    expect(component.popupAction).toBe("CREATE");
    expect(component.showPopup).toBeTrue();
  });

  it('viewEmployee',() => {
    component.employees = [{name:"Mounish"}];
    fixture.detectChanges();
    let de = fixture.debugElement.query(By.css('.fa-eye'));
    let element:HTMLElement = de.nativeElement;
    element.click();
    expect(component.selectedEmployee).toEqual(component.employees[0]);
    expect(component.popupAction).toBe("VIEW");
    expect(component.showPopup).toBeTrue();
  });

  it('editEmployee',() => {
    component.employees = [{name:"Mounish"}];
    fixture.detectChanges();
    let de = fixture.debugElement.query(By.css('.fa-pencil'));
    let element:HTMLElement = de.nativeElement;
    element.click();
    expect(component.selectedEmployee).toEqual(component.employees[0]);
    expect(component.popupAction).toBe("EDIT");
    expect(component.showPopup).toBeTrue();
  });

  describe('deleteEmployee',() => {
    let appService:AppService = null;
    let httpService:HttpService = null;
    let element:HTMLElement = null;

    beforeEach(() => {
      appService = TestBed.inject(AppService);
      httpService = TestBed.inject(HttpService);

      component.employees = [{id: 1, name: "Mounish"}, {id: 2, name: "Shan"}];
      fixture.detectChanges();
      let de = fixture.debugElement.query(By.css('.fa-trash'));
      element = de.nativeElement;
    });

    it('should call httpService', () => {
      let callServiceSpy = spyOn(httpService, 'callService').and.callFake(() => from([]));
      element.click();
      expect(callServiceSpy).toHaveBeenCalled();
    });

    it('should call addMessage on success',() => {
      let response = { message: "Success!" };
      let callServiceSpy = spyOn(httpService, 'callService').and.callFake(() => {
        return from([response]);
      });
      const addMessageSpy = spyOn(appService, 'addMessage');
      element.click();
      expect(addMessageSpy).toHaveBeenCalledWith(response.message, MessageType.SUCCESS);
    });

    it('should call addMessage on error',() => {
      let response = { message: "Failed!" };
      let callServiceSpy = spyOn(httpService, 'callService').and.returnValue(throwError(response));
      const addMessageSpy = spyOn(appService, 'addMessage');
      element.click();
      expect(addMessageSpy).toHaveBeenCalledWith(response.message, MessageType.ERROR);
    });
  });

  it('closeEmployeeDetailPopup',() => {
    const searchEmployeesSpy = spyOn(component, 'searchEmployees')
    component.closeEmployeeDetailPopup(true);
    expect(component.showPopup).toBeFalse();
    expect(searchEmployeesSpy).toHaveBeenCalled();
  });
});
