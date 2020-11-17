import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import HttpMethod from './http-method.enum';
import HttpRequest from './http-request';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  callService({url, method, body, headers}:HttpRequest):Observable<any> {
    if(!url || !url.trim()) throw new Error("You need to pass URL");
    if(!method) method = HttpMethod.GET;

    const httpHeaders = new HttpHeaders();    
    if(!headers || !("Content-Type" in headers)) httpHeaders.set("Content-Type", "application/json");
    if(headers) {
      for(let key in headers) {
        httpHeaders.set(key, headers[key]);
      }
    }

    switch(method) {
      case HttpMethod.GET:
        return this.http.get(url, { headers: httpHeaders });
      case HttpMethod.POST:
        return this.http.post(url, body, { headers: httpHeaders });
      case HttpMethod.PUT:
        return this.http.put(url, body, { headers: httpHeaders });
      case HttpMethod.DELETE:
        return this.http.delete(url, { headers: httpHeaders });
    }
  }
}