package com.gausman.dokolist.restservice.dto;

import com.gausman.dokolist.restservice.model.entities.DokoGame;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class DokoGameResponse {
    private DokoGame dokoGame;
    private List<String> errors;
    private List<String> warnings;
    private List<String> infos;

    public DokoGameResponse(DokoGame dokoGame) {
        this.dokoGame = dokoGame;
        this.errors = new ArrayList<>();
        this.warnings = new ArrayList<>();
        this.infos = new ArrayList<>();
    }

}

