package com.example.EmployeeDemo.client;

import java.util.Arrays;
import java.util.Map;

import org.springframework.http.HttpMethod;

public class RestRequest<Input> {
	
	private String uriKey;
	
	private Object[] pathParams;
	
	private HttpMethod method;
	
	private Input body;
	
	private Map<String, String> headers;
	
	public RestRequest(final String uriKey) {
		this.uriKey = uriKey;
		this.method = HttpMethod.GET;
	}
	
	public String getUriKey() {
		return uriKey;
	}

	public void setUriKey(String uriKey) {
		this.uriKey = uriKey;
	}

	public Object[] getPathParams() {
		return pathParams;
	}

	public void setPathParams(Object[] pathParams) {
		this.pathParams = pathParams;
	}

	public HttpMethod getMethod() {
		return method;
	}
	
	public void setMethod(HttpMethod method) {
		this.method = method;
	}
	
	public Input getBody() {
		return body;
	}
	
	public void setBody(Input body) {
		this.body = body;
	}

	public Map<String, String> getHeaders() {
		return headers;
	}

	public void setHeaders(Map<String, String> headers) {
		this.headers = headers;
	}

	@Override
	public String toString() {
		return "RestRequest [uriKey=" + uriKey + ", pathParams=" + Arrays.toString(pathParams) + ", method="
				+ method + ", body=" + body + ", headers=" + headers + "]";
	}

}