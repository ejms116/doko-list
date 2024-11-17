package com.gausman.dokolist.restservice.util;

import com.gausman.dokolist.restservice.exception.SessionNotFoundException;
import com.gausman.dokolist.restservice.exception.ValidationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ValidationException> handleValidationException(ValidationException ex) {
        // Return a 400 response with the list of validation error messages
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex);
    }

    @ExceptionHandler(SessionNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleSessionNotFoundException(SessionNotFoundException ex) {
        return ex.getMessage();
    }

    // Optionally, handle other exceptions here
}

