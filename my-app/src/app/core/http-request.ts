import HttpMethod from './http-method.enum';

class HttpRequest {
    url:string;
    method:HttpMethod;
    body;
    headers;

    constructor(url:string, method:HttpMethod, body?, headers?) {
        this.url = url;
        this.method = method;
        this.body = body;
        this.headers = headers;
    }
}

export default HttpRequest;