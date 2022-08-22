package com.example.cms.validation;

import lombok.Data;
import lombok.Value;
import org.springframework.http.HttpStatus;

import javax.validation.ConstraintViolation;
import java.util.List;

@Data
public class ValidationError {
    @Value
    static class Violation {
        String field;
        String message;

        Violation(ConstraintViolation<?> violation) {
            field = violation.getPropertyPath().toString();
            message = violation.getMessage();
        }
    }

    private static final String message = "ConstraintViolationException";
    private HttpStatus status;
    private List<Violation> violations;
}
