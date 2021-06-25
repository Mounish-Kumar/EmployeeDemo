package com.example.EmployeeDemo.common;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

@Aspect
@Component
public class LoggingAdvice {
	
	Logger log = LoggerFactory.getLogger(LoggingAdvice.class);
	
	@Around("execution(* com.example.EmployeeDemo.*.*.*(..) )")
	public Object applicationLogging(ProceedingJoinPoint pjp) throws Throwable {
		String methodName = pjp.getSignature().getName();
		String className = pjp.getTarget().getClass().toString();
		Object[] args = pjp.getArgs();
		ObjectMapper mapper = new ObjectMapper();
		log.info("method invoked " + className + " : " + methodName + "() >> Arguments: " + mapper.writeValueAsString(args));
		
		Object object = pjp.proceed();
		log.info(className + " : " + methodName + "() >> Returns: " + mapper.writeValueAsString(object));
		return object;
	}

}
