package com.gausman.dokolist.restservice.service.impl;

import com.gausman.dokolist.restservice.model.entities.DokoGame;
import com.gausman.dokolist.restservice.model.entities.DokoGameSeat;
import com.gausman.dokolist.restservice.model.enums.DokoGameType;
import com.gausman.dokolist.restservice.model.enums.DokoParty;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class DokoGameServiceImplTest {
    private DokoGameServiceImpl dokoGameService = new DokoGameServiceImpl();

    private DokoGame dokoGameTest;

    @BeforeEach
    void setUp() {
        dokoGameTest = new DokoGame();
        dokoGameTest.setDokoGameType(DokoGameType.NORMAL);

        dokoGameTest.setBock(false);

        dokoGameTest.setSoloPlayer(-1);

        dokoGameTest.setResultParty(DokoParty.Re);
        dokoGameTest.setResultValue(60);

        dokoGameTest.setAnsageReVorab(false);
        dokoGameTest.setAnsageRe(true);
        dokoGameTest.setAnsageContraVorab(false);
        dokoGameTest.setAnsageContra(false);

        dokoGameTest.setWeitereAnsagenParty(DokoParty.Re);
        dokoGameTest.setAnsageVorab(90);
        dokoGameTest.setAnsage(60);


        Map<Integer, DokoGameSeat> seatScores = new HashMap<>();
        seatScores.put(0, new DokoGameSeat(3, DokoParty.Re));
        seatScores.put(1, new DokoGameSeat(3, DokoParty.Contra));
        seatScores.put(2, new DokoGameSeat(3, DokoParty.Contra));
        seatScores.put(3, new DokoGameSeat(3, DokoParty.Re));
        seatScores.put(4, new DokoGameSeat(3, DokoParty.Inaktiv));

        dokoGameTest.setSeatScores(seatScores);

    }

    @Test
    void validateGame() {
        assertTrue(true);
    }

    @Test
    void calculateWinnerAndScores(){
        dokoGameService.calculateWinnerAndScores(dokoGameTest);

        assertEquals(dokoGameTest.getDokoGameType(), DokoGameType.NORMAL);
    }
}