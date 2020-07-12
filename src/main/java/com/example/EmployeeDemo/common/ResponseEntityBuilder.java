package com.example.EmployeeDemo.common;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseEntityBuilder {
	
	public static ResponseEntity<Object> buildSuccessResponse(Object object) {
		if(object != null && object instanceof String) {
			EmployeeDemoResponse employeeDemoResponse = new EmployeeDemoResponse((String) object);
			return new ResponseEntity(employeeDemoResponse, HttpStatus.OK);
		} else {
			return new ResponseEntity(object, HttpStatus.OK);
		}
	}
	
	public static ResponseEntity<Object> buildErrorResponse(String message) {
		EmployeeDemoResponse employeeDemoResponse = new EmployeeDemoResponse(message);
		return new ResponseEntity(employeeDemoResponse, HttpStatus.BAD_REQUEST);
	}

}
