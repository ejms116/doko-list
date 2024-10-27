package com.gausman.dokolist.restservice.dto;

import com.gausman.dokolist.restservice.model.DokoGameSeat;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class CreateDokoGameRequest {
    private Long sessionId;
    private int dealer;
    private Map<Integer,DokoGameSeat> seatScores;
}
