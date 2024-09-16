# java sighting api

This app stores car sightings in PostgreSql.

## Requirements

- Java 21 or newer

## Compile

```sh
mvnw compile
```

## Start

Note: this app requires the following environment variables:

- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`

### Linux
```sh
export SPRING_DATASOURCE_URL=jdbc:postgresql://host:port/databaseName
export SPRING_DATASOURCE_USERNAME=the_username
export SPRING_DATASOURCE_PASSWORD=the_password
java -jar java_sighting-0.0.1-SNAPSHOT.jar
```

### Windows
```bat
set SPRING_DATASOURCE_URL=jdbc:postgresql://host:port/databaseName
set SPRING_DATASOURCE_USERNAME=the_username
set SPRING_DATASOURCE_PASSWORD=the_password
java -jar java_sighting-0.0.1-SNAPSHOT.jar
```

# Healthcheck

HTTP GET request to /health should return status `200` and body

> Everything is awesome