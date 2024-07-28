package com.fradantim.testcontainersexample;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.Import;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;

@Import(TestcontainersConfiguration.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class TestContainersExampleApplicationTests {

	@Value("http://localhost:${local.server.port}") private String localUrl;
	
	@Autowired private TestRestTemplate restTemplate;
	
	@Test
	void getNames() {
		RequestEntity<Void> request = RequestEntity.get(localUrl + "/names").build();
		ResponseEntity<List<Name>> response = restTemplate.exchange(request, new ParameterizedTypeReference<>() {});
		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
		assertThat(response.getBody()).isNotNull().hasSize(25);
	}
}