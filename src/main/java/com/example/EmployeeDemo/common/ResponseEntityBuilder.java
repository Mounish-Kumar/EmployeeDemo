package com.example.EmployeeDemo.common;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseEntityBuilder {
	
	public static ResponseEntity<Object> buildSuccessResponse(Object object, Link ...links) {
		if(object != null && object instanceof String)
			object = new EmployeeDemoResponse((String) object);

		return buildResponseEntity(true, object, links);
	}
	
	public static ResponseEntity<Object> buildErrorResponse(String message, Link ...links) {
		return buildResponseEntity(false, new EmployeeDemoResponse(message), links);
	}
	
	public static ResponseEntity<Object> buildResponseEntity(boolean isSuccess, Object object, Link ...links) {
		HttpStatus status = isSuccess ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
		
		if(links == null || links.length <= 0)
			return new ResponseEntity(object, status);
		
		EntityModel<Object> entityModel = EntityModel.of(object);
		entityModel.add(links);
		return new ResponseEntity(entityModel, status);
	}

}
