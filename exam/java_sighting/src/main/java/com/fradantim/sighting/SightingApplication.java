package com.fradantim.sighting;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.annotation.Id;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class SightingApplication {
	public static void main(String[] args) {
		SpringApplication.run(SightingApplication.class, args);
	}

	@Autowired private SightingRepository sightingsRepository;
	
	@GetMapping("/health") public String health() {
		return "Everything is awesome";
	}
	
	@GetMapping("/sightings") public List<Sighting> getSightings() {
		return sightingsRepository.findAll();
	}
	
	@PostMapping("/sightings") public Sighting addSighting(@RequestBody Sighting sighting) {
		return sightingsRepository.save(sighting);
	}
}

interface SightingRepository extends ListCrudRepository<Sighting, Long> {}

record Sighting(@Id Long id, String brandId, String modelId, String image, String description) {}