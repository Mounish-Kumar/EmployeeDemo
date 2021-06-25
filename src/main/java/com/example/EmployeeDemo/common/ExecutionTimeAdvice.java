package com.example.EmployeeDemo.common;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class ExecutionTimeAdvice {
	
	Logger log = LoggerFactory.getLogger(ExecutionTimeAdvice.class);
	
	@Around("@annotation(com.example.EmployeeDemo.common.TrackExecutionTime)")
	public Object trackTime(ProceedingJoinPoint pjp) throws Throwable {
		long startTime = System.currentTimeMillis();
		Object object = pjp.proceed();
		
		long endTime = System.currentTimeMillis();
		long executionTime = endTime - startTime;
		String methodName = pjp.getSignature().getName();
		String className = pjp.getTarget().getClass().toString();
		log.info(className + " : " + methodName + "() >> Execution time: " + executionTime + " milliseconds");
		return object;
	}

}
