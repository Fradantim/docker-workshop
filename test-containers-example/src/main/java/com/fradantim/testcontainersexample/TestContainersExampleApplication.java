package com.fradantim.testcontainersexample;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class TestContainersExampleApplication {
	public static void main(String[] args) {
		SpringApplication.run(TestContainersExampleApplication.class, args);
	}

	@Autowired private NameRepository nameRepository;
	
	@GetMapping("/names") public List<Name> getNames() {
		return nameRepository.findAll();
	}
}

interface NameRepository extends ListCrudRepository<Name, Long> {}

record Name(Long id, String value) {}