package backend.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class GlobalExceptionHandlerTest {

    @Test
    public void handleDataIntegrityViolation() {

    GlobalExceptionHandler handler = new GlobalExceptionHandler();

    DataIntegrityViolationException exception = new DataIntegrityViolationException("Duplicate value");

    ResponseEntity<String> response = handler.handleDataIntegrityViolation(exception);

    assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
    assertEquals("Username or email already exists", response.getBody());
    }
}