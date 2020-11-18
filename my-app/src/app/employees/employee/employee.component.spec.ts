import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeComponent } from './employee.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from 'src/app/core/http.service';
import { from, throwError } from 'rxjs';
import MessageType from 'src/app/core/message-type.enum';
import { AppService } from 'src/app/core/app.service';

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule, ReactiveFormsModule ],
      declarations: [ EmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('form validation', () => {

    describe('firstName', () => {
      let control;

      beforeEach(() => {
        control = component.form.get('firstName');
      });

      it('should be required', () => {
        control.setValue('');
        expect(control.errors.required).toBeTruthy();
      });
  
      it('should have min 3 char', () => {
        control.setValue('Mo');
        expect(control.errors.minlength).toBeTruthy();
      });
  
      it('should have only alphabets', () => {
        control.setValue('123');
        expect(control.errors.pattern).toBeTruthy();
      });
    });

    it('lastName: should have only alphabets', () => {
      const control = component.form.get('lastName');
      control.setValue('123');
      expect(control.errors.pattern).toBeTruthy();
    });

    describe('email', () => {
      let control;

      beforeEach(() => {
        control = component.form.get('email');
      });

      it('should be required', () => {
        control.setValue('');
        expect(control.errors.required).toBeTruthy();
      });

      it('should be valid', () => {
        control.setValue('abc');
        expect(control.errors.pattern).toBeTruthy();
      });
    });

    describe('phone', () => {
      let control;

      beforeEach(() => {
        control = component.form.get('phone');
      });

      it('should be required', () => {
        control.setValue('');
        expect(control.errors.required).toBeTruthy();
      });

      it('should be valid', () => {
        control.setValue('abc');
        expect(control.errors.pattern).toBeTruthy();
      });
    });
  });


  it('closePopup: should raise closeEmitter event', () => {
    let raiseEvent = false;
    component.closeEmitter.subscribe(e => raiseEvent = true);
    component.closePopup();
    expect(raiseEvent).toBeTrue();
  });


  describe('save', () => {
    let appService:AppService = null;
    let httpService:HttpService = null;
    let callServiceSpy = null;
    let response = null;

    beforeEach(() => {
      appService = TestBed.inject(AppService);
      httpService = TestBed.inject(HttpService);
    });

    describe('success response', () => {

      beforeEach(() => {
        component.action = 'CREATE';
        response = { message: "Success!" };
        callServiceSpy = spyOn(httpService, 'callService').and.callFake(() => {
          return from([response]);
        });
      });

      it('should call httpService', () => {
        component.save();
        expect(callServiceSpy).toHaveBeenCalled();
      });

      it('should call addMessage', () => {
        const addMessageSpy = spyOn(appService, 'addMessage');
        component.save();
        expect(addMessageSpy).toHaveBeenCalledWith(response.message, MessageType.SUCCESS);
      });

      it('should raise closeEmitter event', () => {
        let raiseEvent = null;
        component.closeEmitter.subscribe(e => raiseEvent = e);
        component.save();
        expect(raiseEvent).toBeTrue();
      });

    });

    it('error response: should call addMessage', () => {
      component.action = 'EDIT';
      response = { message: "Failed!" };
      callServiceSpy = spyOn(httpService, 'callService').and.returnValue(throwError(response));
      const addMessageSpy = spyOn(appService, 'addMessage');
      component.save();
      expect(addMessageSpy).toHaveBeenCalledWith(response.message, MessageType.ERROR);
    });
  });

});
