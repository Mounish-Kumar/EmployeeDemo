package com.example.EmployeeDemo.common;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;

public class AuthInterceptor implements HandlerInterceptor {
	
	Logger log = LoggerFactory.getLogger(AuthInterceptor.class);
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//		log.info("GeneralPurposeInterceptor >> preHandle");
//		String apiKey = request.getHeader("apikey");
//		if(StringUtils.isEmpty(apiKey)) {
//			response.setStatus(HttpStatus.UNAUTHORIZED.value());
//			return false;
//		}

		return true;
	}


}
