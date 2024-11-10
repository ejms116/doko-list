package com.gausman.dokolist.restservice.util;

import com.gausman.dokolist.restservice.dto.DokoGameResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.List;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ValidationException> handleValidationException(ValidationException ex) {
        // Return a 400 response with the list of validation error messages
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex);
    }

    // Optionally, handle other exceptions here
}

