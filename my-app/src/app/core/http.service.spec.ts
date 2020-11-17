import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from './http.service';
import { from, throwError } from 'rxjs';
import HttpMethod from './http-method.enum';
import HttpRequest from './http-request';

describe('HttpService', () => {
  let service: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ HttpClient ]
    });
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const url = "/v1/fake";
  let http:HttpClient = null;

  beforeEach(() => {
    http = TestBed.inject(HttpClient);
  });

  it('should call GET', () => {
    let spy = spyOn(http, 'get').and.callFake(() => from([]));
    const httpRequest = new HttpRequest(url, HttpMethod.GET);
    service.callService(httpRequest);
    expect(spy).toHaveBeenCalled();
  });

  it('should call POST', () => {
    let spy = spyOn(http, 'post').and.callFake(() => from([]));
    const httpRequest = new HttpRequest(url, HttpMethod.POST);
    service.callService(httpRequest);
    expect(spy).toHaveBeenCalled();
  });

  it('should call PUT', () => {
    let spy = spyOn(http, 'put').and.callFake(() => from([]));
    const httpRequest = new HttpRequest(url, HttpMethod.PUT);
    service.callService(httpRequest);
    expect(spy).toHaveBeenCalled();
  });

  it('should call DELETE', () => {
    let spy = spyOn(http, 'delete').and.callFake(() => from([]));
    const httpRequest = new HttpRequest(url, HttpMethod.DELETE);
    service.callService(httpRequest);
    expect(spy).toHaveBeenCalled();
  });

  it('should throw error for empty url', () => {
    const httpRequest = new HttpRequest("");
    expect(() => service.callService(httpRequest)).toThrowError("You need to pass URL");
  });

  it('should call GET for empty method', () => {
    let spy = spyOn(http, 'get').and.callFake(() => from([]));
    const httpRequest = new HttpRequest(url, null, {}, { "Auth-Token": "dummy" });
    service.callService(httpRequest);
    expect(spy).toHaveBeenCalled();
  });
});
