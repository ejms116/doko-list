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

    public DokoGameSeat(){};


    public DokoGameSeat(int score, DokoParty party) {
        this.score = score;
        this.party = party;
    }
}
