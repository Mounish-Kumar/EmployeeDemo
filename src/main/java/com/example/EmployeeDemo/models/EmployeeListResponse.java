package com.example.EmployeeDemo.models;

import java.util.List;

public class EmployeeListResponse {
	
	List<Employee> employeeList;

	public List<Employee> getEmployeeList() {
		return employeeList;
	}

	public void setEmployeeList(List<Employee> employeeList) {
		this.employeeList = employeeList;
	}

	@Override
	public String toString() {
		return "EmployeeListResponse [employeeList=" + employeeList + "]";
	}

}
