package com.gausman.dokolist.restservice.dto;

import com.gausman.dokolist.restservice.model.entities.DokoGameSeat;
import com.gausman.dokolist.restservice.model.enums.DokoGameType;
import com.gausman.dokolist.restservice.model.enums.DokoParty;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class CreateDokoGameRequest {
    private Long sessionId;
    private int dealer;
    private boolean moreBock;
    private boolean bock;
    private DokoGameType dokoGameType;
    private DokoParty winParty;
    private DokoParty resultParty;
    private int resultValue;
    private boolean ansageRe;
    private boolean ansageReVorab;
    private boolean ansageContra;
    private boolean ansageContraVorab;
    private DokoParty weitereAnsagenParty;
    private int ansage;
    private int ansageVorab;

    private Map<Integer,DokoGameSeat> seatScores;
}
