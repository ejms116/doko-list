package com.gausman.dokolist.restservice.dto;

import com.gausman.dokolist.restservice.model.entities.DokoGameSeat;
import com.gausman.dokolist.restservice.model.entities.DokoGameSonderpunkt;
import com.gausman.dokolist.restservice.model.enums.DokoGameType;
import com.gausman.dokolist.restservice.model.enums.DokoParty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class CreateDokoGameRequest {
    private boolean writeToDb;
    private Long sessionId;
    private int dealer;
    private int soloPlayer;
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
    private DokoParty weitereAnsagenPartyVorab;
    private int ansage;
    private int ansageVorab;

    private Map<Integer,DokoGameSeat> seatScores;

    private List<CreateDokoSonderpunkt> sonderpunkte;
}
