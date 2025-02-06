package com.linked;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class JobPortalApplication {

	public static void main(String[] args) {
		SpringApplication.run(JobPortalApplication.class, args);
	}
}
