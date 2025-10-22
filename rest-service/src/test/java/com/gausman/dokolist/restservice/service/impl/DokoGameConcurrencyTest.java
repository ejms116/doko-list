package com.gausman.dokolist.restservice.service.impl;

import com.gausman.dokolist.restservice.dto.CreateDokoGameRequest;
import com.gausman.dokolist.restservice.dto.CreateDokoSonderpunkt;
import com.gausman.dokolist.restservice.dto.DokoGameResponse;
import com.gausman.dokolist.restservice.model.entities.DokoGame;
import com.gausman.dokolist.restservice.model.entities.DokoGameSeat;
import com.gausman.dokolist.restservice.model.enums.DokoGameType;
import com.gausman.dokolist.restservice.model.enums.DokoParty;
import com.gausman.dokolist.restservice.service.DokoGameService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.*;

@SpringBootTest
@Transactional
class DokoGameConcurrencyTest {

    @Autowired
    private DokoGameService dokoGameService;

    @Test
    void testConcurrentGameCreation() throws InterruptedException {
        int threadCount = 5;
        ExecutorService executor = Executors.newFixedThreadPool(threadCount);

        List<Future<DokoGameResponse>> futures = new ArrayList<>();

        for (int i = 0; i < threadCount; i++) {
            futures.add(executor.submit(() -> {
                CreateDokoGameRequest request = new CreateDokoGameRequest();
                request.setWriteToDb(true);
                request.setSessionId(202L);
                request.setDealer(2); // adjust as needed
                request.setSoloPlayer(-1);
                request.setMoreBock(false);
                request.setDokoGameType(DokoGameType.NORMAL);
                request.setWinParty(DokoParty.Inaktiv);
                request.setResultParty(DokoParty.Re);
                request.setResultValue(120);
                request.setAnsageRe(false);
                request.setAnsageReVorab(false);
                request.setAnsageContra(false);
                request.setAnsageContraVorab(false);
                request.setWeitereAnsagenParty(DokoParty.Inaktiv);
                request.setWeitereAnsagenPartyVorab(DokoParty.Inaktiv);
                request.setAnsage(120);
                request.setAnsageVorab(120);
                Map<Integer, DokoGameSeat> seatScores = new HashMap<>();
                seatScores.put(0, new DokoGameSeat(0, DokoParty.Re));
                seatScores.put(1, new DokoGameSeat(0, DokoParty.Contra));
                seatScores.put(2, new DokoGameSeat(0, DokoParty.Inaktiv));
                seatScores.put(3, new DokoGameSeat(0, DokoParty.Contra));
                seatScores.put(4, new DokoGameSeat(0, DokoParty.Re));
                request.setSeatScores(seatScores);
                List<CreateDokoSonderpunkt> sonderpunkte = new ArrayList<>();
                request.setSonderpunkte(sonderpunkte);
                return dokoGameService.createGameTest(request);
//                return dokoGameService.createGameAndPersist(request);
            }));
        }

        executor.shutdown();
        executor.awaitTermination(10, TimeUnit.SECONDS);

        int success = 0, failures = 0;
        for (Future<DokoGameResponse> f : futures) {
            try {
                DokoGameResponse r = f.get();
                System.out.println(r);
                if (r.getErrors().isEmpty()) success++;
                else failures++;
            } catch (ExecutionException e) {
                failures++;
            }
        }

        System.out.println("Success: " + success + ", Failures: " + failures);
    }

}

