package com.gausman.dokolist.restservice.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter
@Setter
public class DokoGameSeat {
    private int score;
    private DokoParty party;

    public DokoGameSeat(){};

    public DokoGameSeat(int score, DokoParty party) {
        this.score = score;
        this.party = party;
    }
}
