package com.gausman.dokolist.restservice.util;

import java.util.List;

public class ValidationException extends RuntimeException {
    private final List<String> errors;

    public ValidationException(List<String> errors) {
        super("Validation failed"); // Generic message
        this.errors = errors;
    }

    public List<String> getErrors() {
        return errors;
    }
}
