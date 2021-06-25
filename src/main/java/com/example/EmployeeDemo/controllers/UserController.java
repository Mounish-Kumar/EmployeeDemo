package com.example.EmployeeDemo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.EmployeeDemo.client.UserClient;
import com.example.EmployeeDemo.common.ResponseEntityBuilder;
import com.example.EmployeeDemo.models.dto.UserResponse;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/user")
public class UserController {
	
	@Autowired
	UserClient userClient;
	
	@GetMapping
	ResponseEntity<Object> getUser() {
		List<UserResponse> list = userClient.getUsers();
		return ResponseEntityBuilder.buildSuccessResponse(list);
	}

}
