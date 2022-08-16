package com.example.cms.validation;

import com.example.cms.validation.exceptions.BadRequestException;
import com.example.cms.validation.exceptions.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.validation.ConstraintViolationException;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    ResponseEntity<String> handlePageNotFound() {
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler(BadRequestException.class)
    ResponseEntity<String> handlePageBadRequest(BadRequestException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<?> handleConstraintViolationException(ConstraintViolationException exception) {
        ValidationError error = new ValidationError();
        error.setStatus(HttpStatus.BAD_REQUEST);
        var violations = exception.getConstraintViolations().stream()
                .map(ValidationError.Violation::new)
                .collect(Collectors.toList());

        error.setViolations(violations);
        return ResponseEntity.badRequest().body(error);
    }
}
