package com.example.EmployeeDemo.client;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.EmployeeDemo.models.dto.UserResponse;


@FeignClient(url="https://jsonplaceholder.typicode.com", name="user-client")
public interface UserClient {
	
	@GetMapping("/users")
	public List<UserResponse> getUsers();

}
