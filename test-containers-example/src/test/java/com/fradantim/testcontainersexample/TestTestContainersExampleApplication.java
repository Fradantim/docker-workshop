package com.fradantim.testcontainersexample;

import org.springframework.boot.SpringApplication;

public class TestTestContainersExampleApplication {
	public static void main(String[] args) {
		SpringApplication.from(TestContainersExampleApplication::main).with(TestcontainersConfiguration.class).run(args);
	}
}