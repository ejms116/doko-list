package com.gausman.dokolist.restservice.service.impl;

import com.gausman.dokolist.restservice.dto.CreateDokoGameRequest;
import com.gausman.dokolist.restservice.dto.CreateDokoSonderpunkt;
import com.gausman.dokolist.restservice.dto.DokoGameResponse;
import com.gausman.dokolist.restservice.model.entities.*;
import com.gausman.dokolist.restservice.model.enums.DokoGameType;
import com.gausman.dokolist.restservice.model.enums.DokoParty;
import com.gausman.dokolist.restservice.model.enums.DokoSonderpunktType;
import com.gausman.dokolist.restservice.repository.DokoGameRepository;
import com.gausman.dokolist.restservice.repository.DokoPlayerRepository;
import com.gausman.dokolist.restservice.repository.DokoSessionRepository;
import com.gausman.dokolist.restservice.service.DokoGameService;

import com.gausman.dokolist.restservice.exception.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import java.util.*;
import java.util.stream.Collectors;


@Service
public class DokoGameServiceImpl implements DokoGameService {
    @Autowired
    private PlatformTransactionManager transactionManager;

    @Autowired
    DokoPlayerRepository dokoPlayerRepository;

    @Autowired
    DokoSessionRepository dokoSessionRepository;

    @Autowired
    DokoGameRepository dokoGameRepository;

    @Override
    public List<DokoGame> findAll() {
        return dokoGameRepository.findAll();
    }

    @Override
    public List<DokoGame> findAllBySessionId(Long sessionId) {
        return dokoGameRepository.findByDokoSession_IdOrderByPlayedAsc(sessionId);
    }

    @Override
    public DokoGameResponse createGame(CreateDokoGameRequest request) {
        DokoSession dokoSession = dokoSessionRepository.findById(request.getSessionId())
                .orElseThrow(() -> new RuntimeException("Session not found"));

        // Validations
        //List<String> errors = new ArrayList<>();

        DokoGame dokoGame = new DokoGame();

        // Create the response object with the game and initialize message lists
        DokoGameResponse response = new DokoGameResponse(dokoGame);

        TransactionStatus status = null;
        if (request.isWriteToDb()) {
            status = transactionManager.getTransaction(new DefaultTransactionDefinition());
        }

        try {
            runDefaultValidations(response, dokoGame, request);

            // If there are any validation errors, throw a ValidationException with the list
            if (!response.getErrors().isEmpty()) {
                throw new ValidationException(response);
            } else {
                response.getInfos().add("Spiel erfolgreich geprüft.");
            }


            dokoSession.updateNextDealer();

            setValuesFromRequest(dokoGame, request);
            dokoGame.setDokoSession(dokoSession);
            dokoGame.setBock(dokoSession.useBock());
            dokoGame.setMoreBock(request.isMoreBock());

            if (request.isMoreBock()) {
                dokoSession.addBock();
            }

            calculateWinnerAndScores(dokoGame);

            // Only commit if writeToDb is true
            if (request.isWriteToDb() && status != null) {
                for (DokoSessionPlayer sp : dokoSession.getSessionPlayers()) {
                    sp.setScore(sp.getScore() + request.getSeatScores().get(sp.getSeat()).getScore());
                }

                dokoSessionRepository.save(dokoSession);
                dokoGameRepository.save(dokoGame);
                transactionManager.commit(status);
            }
        } catch (Exception ex) {
            if (status != null) {
                transactionManager.rollback(status);
            }
            throw ex;
        }

        return response;
    }

    @Override
    public DokoGameResponse updateGame(Long gameId, CreateDokoGameRequest request) {
        // Retrieve existing game
        DokoGame dokoGame = dokoGameRepository.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Game not found"));

        // Retrieve associated session if any fields related to it need updating
        DokoSession dokoSession = dokoGame.getDokoSession();

        // Create the response object with the game and initialize message lists
        DokoGameResponse response = new DokoGameResponse(dokoGame);

        // Validations
        //List<String> errors = new ArrayList<>();

        TransactionStatus status = null;
        if (request.isWriteToDb()) {
            status = transactionManager.getTransaction(new DefaultTransactionDefinition());
        }
        try {
            runDefaultValidations(response, dokoGame, request);

            // Bock
            boolean changeBockToNoBock = dokoGame.isBock() && !request.isBock();
            boolean changeNoBockToBock = !dokoGame.isBock() && request.isBock();

            if (changeNoBockToBock) {
                if (dokoSession.getBockRemaining() < 1){
                    response.getErrors().add("Spiel kann nicht in Bock geändert werden, kein Bock übrig.");
                } else {
                    dokoGame.setBock(dokoSession.useBock());
                    response.getWarnings().add("Spiel wurde in Bock geändert.");
                }
            }
            if (changeBockToNoBock){
                dokoSession.addSingleBock();
                response.getWarnings().add("Spiel ist nicht mehr Bock. Ein Bock-Spiel wird wieder hinzugefügt.");
            }
            dokoGame.setBock(request.isBock());

            // Herz rum
            boolean changeHerzToNoHerz = dokoGame.isMoreBock() && !request.isMoreBock();
            boolean changeNoHerzToHerz = !dokoGame.isMoreBock() && request.isMoreBock();

            if (changeHerzToNoHerz){
                if (dokoSession.getBockRemaining() < dokoSession.getSessionPlayers().size()){
                    response.getErrors().add("Bockrunde kann nicht aufgelöst werden, Bock-Spiele bereits verbraucht");
                } else {
                    dokoSession.removeBock();
                    response.getWarnings().add("Vorrat an Bock-Spielen wird verringert.");
                }
            }

            if (changeNoHerzToHerz){
                dokoSession.addBock();
                response.getWarnings().add("Es werden mehr Bock-Spiele angehängt.");

            }

            dokoGame.setMoreBock(request.isMoreBock());

            // If there are any validation errors, throw a ValidationException with the list
            if (!response.getErrors().isEmpty()) {
                throw new ValidationException(response);
            } else {
                response.getInfos().add("Spiel erfolgreich geprüft.");
            }



            Map<Integer,DokoGameSeat> seatMapCopy = new HashMap<>();

            if (request.isWriteToDb() && status != null) {
                dokoGame.getSeatScores().forEach((key, seat) -> {
                    seatMapCopy.put(key, new DokoGameSeat(seat.getScore(), seat.getParty()));
                });
            }


            // Update fields on dokoGame based on request
            setValuesFromRequest(dokoGame, request);

            calculateWinnerAndScores(dokoGame);

            // Only commit if writeToDb is true
            if (request.isWriteToDb() && status != null) {
                // update summed scores in session
                for (DokoSessionPlayer sp : dokoSession.getSessionPlayers()) {
                    sp.setScore(sp.getScore() + request.getSeatScores().get(sp.getSeat()).getScore()
                            - seatMapCopy.get(sp.getSeat()).getScore());

                }

                dokoSessionRepository.save(dokoSession);
                dokoGameRepository.save(dokoGame);
                transactionManager.commit(status);


            }

        } catch (Exception ex) {
            if (status != null) {
                transactionManager.rollback(status);
            }
            throw ex;
        }

        return response;
    }

    private void runDefaultValidations(DokoGameResponse response, DokoGame dokoGame, CreateDokoGameRequest request){
        Map<DokoParty, Integer> partyCount = new HashMap<>();
        partyCount.put(DokoParty.Re, 0);
        partyCount.put(DokoParty.Contra, 0);

        if (!((request.getResultParty().equals(DokoParty.Re)) || (request.getResultParty().equals(DokoParty.Contra)))){
            response.getErrors().add("Es muss ein Ergebnis angegeben werden.");
        }

        // Count occurrences of each DokoParty in seatScores and merge results with initial map
        Map<DokoParty, Integer> countedParties = request.getSeatScores().values().stream()
                .collect(Collectors.groupingBy(
                        DokoGameSeat::getParty,
                        Collectors.reducing(0, e -> 1, Integer::sum)
                ));

        // Add countedParties to partyCount to ensure default values are present
        countedParties.forEach((party, count) ->
                partyCount.merge(party, count, Integer::sum)
        );



        if (isSolo(request)){
            if (!request.getSonderpunkte().isEmpty()){
                response.getWarnings().add("Bei Solo werden Sonderpunkte ignoriert.");
                request.getSonderpunkte().clear();
            }

            if (partyCount.get(DokoParty.Re) != 1){
                response.getErrors().add("Bei Solo muss genau ein Spieler Re sein.");
            }

        }

        if (request.getDokoGameType().equals(DokoGameType.HOCHZEIT_STILL)){
            if (partyCount.get(DokoParty.Re) != 1){
                response.getErrors().add("Bei stiller Hochzeit muss genau ein Spieler Re sein.");
            }

        }

        if (request.getDokoGameType().equals(DokoGameType.HOCHZEIT)){
            if (!((partyCount.get(DokoParty.Re) == 1) || (partyCount.get(DokoParty.Re) == 2))){
                response.getErrors().add("Bei Hochzeit müssen ein oder zwei Spieler Re sein.");
            }
            DokoGameSeat soloSeat = request.getSeatScores().get(request.getSoloPlayer());
            if (soloSeat == null) {
                response.getErrors().add("Bei Hochzeit bitte angeben wer diese gespielt hat.");
            } else if (!soloSeat.getParty().equals(DokoParty.Re)) {
                response.getErrors().add("Hochzeit Spieler muss Re sein.");
            }

        }

        if (request.getDokoGameType().equals(DokoGameType.NORMAL) && (partyCount.get(DokoParty.Re) != 2)){
            response.getErrors().add("Bei Normalspiel müssen genau zwei Spieler Re sein.");
        }

        if (isSolo(request) && request.isMoreBock()){
            response.getWarnings().add("Bei Solo zählt Herz rum nicht.");
            request.setMoreBock(false);
        }

        if (!request.getWeitereAnsagenPartyVorab().equals(DokoParty.Inaktiv) &&
                !request.getWeitereAnsagenParty().equals(request.getWeitereAnsagenPartyVorab())){
            response.getErrors().add("Dieselbe Partei muss weitere Ansagen (90,60,30,Schwarz) und Vorab-Ansagen machen.");
        }

        if (request.getAnsageVorab() < request.getAnsage()){
            response.getErrors().add("Vorab-Ansagen können nicht höher als normale Ansagen sein.");
        }

        if (!request.isAnsageRe() && request.isAnsageReVorab()){
            response.getErrors().add("Bei Re-Vorab muss auch normale Re-Ansage erfolgen.");
        }

        if (!request.isAnsageContra() && request.isAnsageContraVorab()){
            response.getErrors().add("Bei Contra-Vorab muss auch normale Contra-Ansage erfolgen.");
        }


        // Sopo Validierungen
        Map<DokoSonderpunktType, Integer> countedSopo = request.getSonderpunkte().stream()
                .collect(Collectors.groupingBy(
                        CreateDokoSonderpunkt::getType,
                        Collectors.reducing(0, e -> 1, Integer::sum)
                ));

        Integer doppelkopfCount = countedSopo.getOrDefault(DokoSonderpunktType.DOPPELKOPF, 0);
        Integer fuchsGefangenCount = countedSopo.getOrDefault(DokoSonderpunktType.FUCHS_GEFANGEN, 0);
        Integer fuchsAmEndCount = countedSopo.getOrDefault(DokoSonderpunktType.FUCHS_AM_END, 0);
        Integer charlieCount = countedSopo.getOrDefault(DokoSonderpunktType.CHARLIE, 0);
        Integer charlieGefangenCount = countedSopo.getOrDefault(DokoSonderpunktType.CHARLIE_GEFANGEN, 0);
        Integer fuchsjagdGeschafftCount = countedSopo.getOrDefault(DokoSonderpunktType.FUCHSJAGD_GESCHAFFT, 0);
        Integer fuchsjagdFehlgeschlagenCount = countedSopo.getOrDefault(DokoSonderpunktType.FUCHSJAGD_FEHLGESCHLAGEN, 0);

        if (doppelkopfCount > 4){
            response.getErrors().add("Es können maximal 4 Doppelköpfe vorhanden sein.");
        } else if (doppelkopfCount == 4) {
            response.getWarnings().add("Es wurden vier Doppelköpfe angegeben. Sind Sie sicher?");
        }

        if (fuchsGefangenCount > 2){
            response.getErrors().add("Es können maximal 2 Füchse gefangen worden sein.");
        }

        // Fuchs am End
        if (fuchsAmEndCount == 1){
            if (charlieCount == 1){
                response.getErrors().add("Bei Fuchs Am End kann es keinen Charlie geben.");
            }
            if (charlieGefangenCount == 1){
                response.getErrors().add("Bei Fuchs Am End kann kein Charlie gefangen worden sein.");
            }
            if (fuchsGefangenCount == 2){
                response.getErrors().add("Bei Fuchs Am End können keine zwei Füchs gefangen worden sein.");
            }

            CreateDokoSonderpunkt fuchsAmEnd = findByType(request.getSonderpunkte(), DokoSonderpunktType.FUCHS_AM_END)
                    .orElseThrow(() -> new IllegalStateException("Expected value not found"));;

            if (containsSopoForParty(request.getSonderpunkte(), DokoSonderpunktType.FUCHSJAGD_GESCHAFFT, invertDokoParty(fuchsAmEnd.getDokoParty()))){
                response.getErrors().add("Bei Fuchs am End kann die andere Partei keine Fuchsjagd geschafft haben.");
            }

            if (containsSopoForParty(request.getSonderpunkte(), DokoSonderpunktType.FUCHSJAGD_FEHLGESCHLAGEN, fuchsAmEnd.getDokoParty())){
                response.getErrors().add(String.format("Partei %s hat Fuchs am End, aber %s eine Fuchsjagd angesagt", fuchsAmEnd.getDokoParty(), invertDokoParty(fuchsAmEnd.getDokoParty())));
            }

        }

        // Fuchsjagd geschafft
        if (fuchsjagdGeschafftCount == 1){
            if (fuchsjagdFehlgeschlagenCount == 1){
                response.getErrors().add("Fuchsjagd geschafft und fehlgeschlagen schließen sich aus.");
            }
            if (fuchsGefangenCount > 0){
                response.getErrors().add("Bei Fuchsjagd geschafft können keine Füchs gefangen worden sein.");
            }
        }

        // Fuchsjagd fehlgeschlagen
        if (fuchsjagdFehlgeschlagenCount == 1){
            CreateDokoSonderpunkt fuchsjagdFehlgeschlagen = findByType(request.getSonderpunkte(), DokoSonderpunktType.FUCHSJAGD_FEHLGESCHLAGEN)
                    .orElseThrow(() -> new IllegalStateException("Expected value not found"));

            if (!containsSopoForParty(request.getSonderpunkte(), DokoSonderpunktType.FUCHS_GEFANGEN, fuchsjagdFehlgeschlagen.getDokoParty())){
                response.getErrors().add(String.format("Partei %s hat eine Fuchsjagd verhindert, aber keinen Fuchs gefangen.", fuchsjagdFehlgeschlagen.getDokoParty()));
            }

            if (containsSopoForParty(request.getSonderpunkte(), DokoSonderpunktType.FUCHS_GEFANGEN, invertDokoParty(fuchsjagdFehlgeschlagen.getDokoParty()))){
                response.getErrors().add(String.format("Partei %s hat eine Fuchsjagd verhindert, aber %s hat einen Fuchs gefangen.",
                        fuchsjagdFehlgeschlagen.getDokoParty(), invertDokoParty(fuchsjagdFehlgeschlagen.getDokoParty())));
            }

        }

        // Charlie
        if (charlieCount == 1){
            CreateDokoSonderpunkt charlie = findByType(request.getSonderpunkte(), DokoSonderpunktType.CHARLIE)
                    .orElseThrow(() -> new IllegalStateException("Expected value not found"));

            if (containsSopoForParty(request.getSonderpunkte(), DokoSonderpunktType.CHARLIE_GEFANGEN, invertDokoParty(charlie.getDokoParty()))){
                response.getErrors().add(String.format("Partei %s hat Charlie gemacht, aber %s hat einen Charlie gefangen.",
                        charlie.getDokoParty(), invertDokoParty(charlie.getDokoParty())));
            }
        }

        if (charlieGefangenCount == 2){
            if (charlieCount == 1){
                response.getErrors().add("Bei zwei gefangenen Charlie kann nicht auch Charlie gemacht worden sein.");
            }

            List<CreateDokoSonderpunkt> charlieGefangen = request.getSonderpunkte().stream().filter(
                    item -> item.getType().equals(DokoSonderpunktType.CHARLIE_GEFANGEN)
            ).toList();

            if (!allHaveSameParty(charlieGefangen)){
                response.getErrors().add("Bei zwei gefangenen Charlie müssen diese von derselben Partei sein.");
            }


        }

    }

    private boolean allHaveSameParty(List<CreateDokoSonderpunkt> list){
        if (list.isEmpty()){
            return true;
        }
        DokoParty firstParty = list.get(0).getDokoParty();

        return list.stream()
                .allMatch(item -> item.getDokoParty().equals(firstParty));

    }

    // Generische Funktion die überprüft, ob Liste Sonderpunkte mindestens einen Eintrag für Party+SopoTyp hat
    private boolean containsSopoForParty(List<CreateDokoSonderpunkt> list, DokoSonderpunktType sopo, DokoParty party) {
        return list.stream()
                .anyMatch(item -> item.getType() == sopo &&
                        item.getDokoParty() == party);
    }


    private Optional<CreateDokoSonderpunkt> findByType(List<CreateDokoSonderpunkt> list, DokoSonderpunktType type) {
        return list.stream()
                .filter(item -> item.getType() == type)
                .findFirst();
    }



    private boolean isSolo(CreateDokoGameRequest request){
        if (request.getDokoGameType().equals(DokoGameType.BUBEN_SOLO)
        || request.getDokoGameType().equals(DokoGameType.DAMEN_SOLO)
        || request.getDokoGameType().equals(DokoGameType.TRUMPF_SOLO)){
            return true;
        }
        return false;
    }

    private void setSoloPlayer(DokoGame dokoGame, CreateDokoGameRequest request){
        if (isSolo(request) || request.getDokoGameType().equals(DokoGameType.HOCHZEIT_STILL)){
            Integer soloId = request.getSeatScores().entrySet().stream()
                    .filter(entry -> entry.getValue().getParty().equals(DokoParty.Re))
                    .map(Map.Entry::getKey)
                    .findFirst()
                    .orElse(-1);
            dokoGame.setSoloPlayer(soloId);
        } else if (request.getDokoGameType().equals(DokoGameType.HOCHZEIT)) {
            dokoGame.setSoloPlayer(request.getSoloPlayer());
        } else {
            dokoGame.setSoloPlayer(-1);
        }

    }


    private void setValuesFromRequest(DokoGame dokoGame, CreateDokoGameRequest request){
        dokoGame.setDealer(request.getDealer());
        setSoloPlayer(dokoGame, request);
        dokoGame.setDokoGameType(request.getDokoGameType());
        dokoGame.setWinParty(request.getWinParty());
        dokoGame.setResultParty(request.getResultParty());
        dokoGame.setResultValue(request.getResultValue());
        dokoGame.setAnsageRe(request.isAnsageRe());
        dokoGame.setAnsageReVorab(request.isAnsageReVorab());
        dokoGame.setAnsageContra(request.isAnsageContra());
        dokoGame.setAnsageContraVorab(request.isAnsageContraVorab());
        dokoGame.setWeitereAnsagenParty(request.getWeitereAnsagenParty());
        dokoGame.setAnsage(request.getAnsage());
        dokoGame.setAnsageVorab(request.getAnsageVorab());
        dokoGame.setSeatScores(request.getSeatScores());

        dokoGame.getSonderpunkte().clear();

        for (CreateDokoSonderpunkt spRequest: request.getSonderpunkte()){
            dokoGame.addSonderpunkt(spRequest);
        }
    }

    private DokoParty invertDokoParty(DokoParty party){
        if (party.equals(DokoParty.Re)){
            return DokoParty.Contra;
        }
        if (party.equals(DokoParty.Contra)){
            return DokoParty.Re;
        }
        return DokoParty.Inaktiv;
    }

    private int calculateBaseScore(DokoGame dokoGame, boolean winSwitch){
        int generalScore = 1;

        // Normale Ansagen und Vorab
        if (dokoGame.isAnsageContra()) generalScore += 1;
        if (dokoGame.isAnsageContraVorab()) generalScore += 1;
        if (dokoGame.isAnsageRe()) generalScore += 1;
        if (dokoGame.isAnsageReVorab()) generalScore += 1;

        // Contra Extrapunkt
        if (dokoGame.getWinParty().equals(DokoParty.Contra)) generalScore += 1;

        // Ansagen
        int ansagenScore = 4 - dokoGame.getAnsage()/30;
        generalScore += ansagenScore;

        // Ergebnis
        int ergebnisScore = 4 - dokoGame.getResultValue()/30;

        if (winSwitch){
            ergebnisScore = Math.max(ergebnisScore, ansagenScore);
        }
        generalScore += ergebnisScore;

        // Vorab Ansagen
        generalScore += 4 - dokoGame.getAnsageVorab()/30;

        switch (dokoGame.getDokoGameType()) {
            case HOCHZEIT_STILL:
                generalScore += 1;
                break;
            case BUBEN_SOLO:
                generalScore += 2;
                break;
            case DAMEN_SOLO:
                generalScore += 3;
                break;
            case TRUMPF_SOLO:
                generalScore += 4;
                break;
            default:
                break;
        }

        int sopo = 0;

        for (DokoGameSonderpunkt sp : dokoGame.getSonderpunkte()) {
            sopo += sp.getDokoParty().equals(DokoParty.Re) ? 1 : -1;
        }

        generalScore += dokoGame.getWinParty().equals(DokoParty.Re) ? sopo : -sopo;

        return generalScore;
    }

    public void calculateWinnerAndScores(DokoGame dokoGame){
        boolean winSwitch = false;
        // Calculate winning Party
        if (dokoGame.getResultParty().equals(dokoGame.getWeitereAnsagenParty()) && dokoGame.getAnsage() < dokoGame.getResultValue()){
            dokoGame.setWinParty(invertDokoParty(dokoGame.getResultParty()));
        } else {
            dokoGame.setWinParty(dokoGame.getResultParty());
        }

        if (!dokoGame.getWinParty().equals(dokoGame.getWeitereAnsagenParty()) && !DokoParty.Inaktiv.equals(dokoGame.getWeitereAnsagenParty())){
            winSwitch = true;
        }

        // Hängen gelassen check
        long reCount = dokoGame.getSeatScores().values().stream()
                .filter(seat -> seat.getParty() == DokoParty.Re)
                .count();

        boolean haengt = reCount == 1;

        // Calculate general score
        final int generalScore = calculateBaseScore(dokoGame, winSwitch);

        // Calculate individual scores
        // Vorzeichen, Hochzeit,  alleinSpieler x3, Bock
        dokoGame.getSeatScores().forEach((key, seat) -> {
            if (seat.getParty().equals(DokoParty.Inaktiv)){
                return;
            }

            boolean isLosingParty = !seat.getParty().equals(dokoGame.getWinParty());
            boolean isSpecialGameType = !dokoGame.getDokoGameType().equals(DokoGameType.NORMAL);
            boolean isNotHochzeitWithHaengt = !(dokoGame.getDokoGameType().equals(DokoGameType.HOCHZEIT) && !haengt);
            boolean isSoloPlayer = key.equals(dokoGame.getSoloPlayer());

            int newScore = 0;

            newScore += generalScore;

            // Vorzeichen
            if (isLosingParty){
                newScore *= -1;
            }

            // Allein (Solo/Hochzeit hängen gelassen)
            if (isSpecialGameType && isNotHochzeitWithHaengt && isSoloPlayer) {
                newScore *= 3;
            }

            // Hochzeit angesagt (egal ob hängen gelassen)
            if (dokoGame.getDokoGameType().equals(DokoGameType.HOCHZEIT)){
                if (isSoloPlayer){
                    newScore += 3;
                } else {
                    newScore -= 1;
                }
            }

            // Bock
            if (dokoGame.isBock()){
                newScore *= 2;
            }

            seat.setScore(newScore);

        });
    }
}
