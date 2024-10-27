package com.gausman.dokolist.restservice.model.entities;

import com.gausman.dokolist.restservice.model.enums.DokoParty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter
@Setter
public class DokoGameSeat {
    private int score;
    private DokoParty party;
    private boolean solo;

    public DokoGameSeat(){};

    public DokoGameSeat(int score, DokoParty party) {
        this.score = score;
        this.party = party;
        this.solo = false;
    }

    public DokoGameSeat(int score, DokoParty party, boolean solo) {
        this.score = score;
        this.party = party;
        this.solo = solo;
    }
}
