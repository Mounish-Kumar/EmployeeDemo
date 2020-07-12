package com.example.EmployeeDemo.common;

public class EmployeeDemoResponse {
	
	private String message;

	public EmployeeDemoResponse(String message) {
		super();
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return "PortfolioResponse [message=" + message + "]";
	}

}
