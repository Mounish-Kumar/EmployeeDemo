package com.example.EmployeeDemo.client;

import java.text.MessageFormat;
import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class EmployeeRestTemplate {
	
	Logger log = LoggerFactory.getLogger(EmployeeRestTemplate.class);
	
	@Autowired
	private Environment env;


	public <Input, Output> Output doRestCall(final RestRequest<Input> request, final Class<Output> outputType) {
		if (request != null) {
			log.info("AxerveRestClient >> doRestCall >> Request is empty");
			// throw custom exception
		}
		
		Output response = null;
		try {
			final String url = getUrl(request);
			final HttpEntity entity = getEntity(request);
			final RestTemplate restTemplate = getRestTemplate();
			ResponseEntity<Output> responseEntity = restTemplate.exchange(url, request.getMethod(), entity, outputType);
			response = responseEntity.getBody();
		} catch(Exception e) {
			log.info("AxerveRestClient >> doRestCall >> Exception");
			// throw custom exception
		}
		return response;
	}
	
	private <Input> String getUrl(final RestRequest<Input> request) {
		String url = env.getProperty(request.getUriKey());
		
		final Object[] pathParams = request.getPathParams();
		if (pathParams != null && pathParams.length > 0)
			url = MessageFormat.format(url, pathParams);
		
		return url;
	}
	
	private <Input> HttpEntity getEntity(final RestRequest<Input> request) {
		final HttpHeaders headers = getHeaders(request);
		final Input requestBody = request.getBody();
		return requestBody != null ? new HttpEntity(requestBody, headers) : new HttpEntity(headers);
	}
	
	private <Input> HttpHeaders getHeaders(final RestRequest<Input> request) {
		HttpHeaders headers = new HttpHeaders();
		
		if(!headers.containsKey("Content-Type"))
			headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
		
		if(request.getHeaders() != null && !request.getHeaders().isEmpty())
			headers.setAll(request.getHeaders());
		
		return headers;
	}
	
	private RestTemplate getRestTemplate() {
		return new RestTemplate();
	}

}