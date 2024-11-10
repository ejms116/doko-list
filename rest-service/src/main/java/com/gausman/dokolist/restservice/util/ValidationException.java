package com.gausman.dokolist.restservice.util;

import com.gausman.dokolist.restservice.dto.DokoGameResponse;

import java.util.List;

public class ValidationException extends RuntimeException {
    private final DokoGameResponse res;

    public ValidationException(DokoGameResponse res) {
        super("Validation failed"); // Generic message
        this.res = res;
    }

    public List<String> getErrors() {
        return res.getErrors();
    }

    public List<String> getInfos() {
        return res.getInfos();
    }

    public List<String> getWarnings() {
        return res.getWarnings();
    }


}
