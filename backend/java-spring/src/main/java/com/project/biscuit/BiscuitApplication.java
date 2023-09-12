package com.project.biscuit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class BiscuitApplication {
	public static void main(String[] args) {
		SpringApplication.run(BiscuitApplication.class, args);
	}

}
