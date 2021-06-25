package com.example.EmployeeDemo.controllers;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.EmployeeDemo.common.ResponseEntityBuilder;
import com.example.EmployeeDemo.common.TrackExecutionTime;
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
	@TrackExecutionTime
	ResponseEntity<Object> saveEmployee(@RequestBody final Employee employee) {
		Employee savedEmployee = employeeRepository.save(employee);
		
		Link viewLink = linkTo(methodOn(this.getClass())
						.getEmployeeById(savedEmployee.getId()))
						.withRel("view");
		
		Link updateLink = linkTo(methodOn(this.getClass())
							.updateEmployee(savedEmployee))
							.withRel("update");
		
		Link deleteLink = linkTo(methodOn(this.getClass())
							.deleteEmployee(savedEmployee.getId()))
							.withRel("delete");
		
		return ResponseEntityBuilder.buildSuccessResponse("Saved Successfully!!!", viewLink, updateLink, deleteLink);
	}
	
	@GetMapping
	@TrackExecutionTime
	ResponseEntity<Object> getEmployee() {
		List<Employee> employeeList = employeeRepository.findAll();
		
		for(Employee employee : employeeList) {
			Link viewLink = linkTo(methodOn(this.getClass())
					.getEmployeeById(employee.getId()))
					.withRel("view");

			Link deleteLink = linkTo(methodOn(this.getClass())
					.deleteEmployee(employee.getId()))
					.withRel("delete");
			
			employee.add(viewLink, deleteLink);
		}
		
		EmployeeListResponse employeeListResponse = new EmployeeListResponse();
		employeeListResponse.setEmployeeList(employeeList);
		return ResponseEntityBuilder.buildSuccessResponse(employeeListResponse);
	}
	
	@GetMapping("/{id}")
	ResponseEntity<Object> getEmployeeById(@PathVariable final Long id) {
		Employee employee = employeeRepository.findById(id).orElse(null);
		return ResponseEntityBuilder.buildSuccessResponse(employee);
	}
	
	@PutMapping
	ResponseEntity<Object> updateEmployee(@RequestBody final Employee employee) {
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
	ResponseEntity<Object> deleteEmployee(@PathVariable final Long id) {
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
