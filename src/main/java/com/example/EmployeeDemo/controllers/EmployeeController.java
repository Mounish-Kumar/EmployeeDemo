package com.example.EmployeeDemo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.EmployeeDemo.common.ResponseEntityBuilder;
import com.example.EmployeeDemo.models.Employee;
import com.example.EmployeeDemo.models.EmployeeListResponse;
import com.example.EmployeeDemo.repositories.EmployeeRepository;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/employee")
public class EmployeeController {
	
	@Autowired
	EmployeeRepository employeeRepository;
	
	@PostMapping
	@ResponseBody ResponseEntity<Object> saveEmployee(@RequestBody final Employee employee) {
		employeeRepository.save(employee);
		return ResponseEntityBuilder.buildSuccessResponse("Saved Successfully!!!");
	}
	
	@GetMapping
	@ResponseBody ResponseEntity<Object> getEmployee() {
		List<Employee> employeeList = employeeRepository.findAll();
		EmployeeListResponse employeeListResponse = new EmployeeListResponse();
		employeeListResponse.setEmployeeList(employeeList);
		return ResponseEntityBuilder.buildSuccessResponse(employeeListResponse);
	}
	
	@PutMapping
	@ResponseBody ResponseEntity<Object> updateEmployee(@RequestBody final Employee employee) {
		ResponseEntity<Object> responseEntity = null;
		final Long id = employee != null ? employee.getId() : null; 
		if(employeeRepository.existsById(id)) {
			employeeRepository.save(employee);
			responseEntity = ResponseEntityBuilder.buildSuccessResponse("Updated Successfully!!!");
		} else {
			responseEntity = ResponseEntityBuilder.buildErrorResponse("ID doesn't exist");
		}
		return responseEntity;
	}
	
	@DeleteMapping("/{id}")
	@ResponseBody ResponseEntity<Object> deleteEmployee(@PathVariable final Long id) {
		ResponseEntity<Object> responseEntity = null;
		if(employeeRepository.existsById(id)) {
			employeeRepository.deleteById(id);
			responseEntity = ResponseEntityBuilder.buildSuccessResponse("Deleted Successfully!!!");
		} else {
			responseEntity = ResponseEntityBuilder.buildErrorResponse("ID doesn't exist");
		}
		return responseEntity;
	}

}
