package com.gausman.dokolist.restservice.service.impl;

import com.gausman.dokolist.restservice.dto.CreateDokoGameRequest;
import com.gausman.dokolist.restservice.model.entities.DokoGame;
import com.gausman.dokolist.restservice.model.entities.DokoGameSeat;
import com.gausman.dokolist.restservice.model.entities.DokoSession;
import com.gausman.dokolist.restservice.model.entities.DokoSessionPlayer;
import com.gausman.dokolist.restservice.model.enums.DokoGameType;
import com.gausman.dokolist.restservice.model.enums.DokoParty;
import com.gausman.dokolist.restservice.repository.DokoGameRepository;
import com.gausman.dokolist.restservice.repository.DokoPlayerRepository;
import com.gausman.dokolist.restservice.repository.DokoSessionRepository;
import com.gausman.dokolist.restservice.service.DokoGameService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class DokoGameServiceImpl implements DokoGameService {

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
    @Transactional
    public DokoGame createGame(CreateDokoGameRequest request) {
        DokoSession dokoSession = dokoSessionRepository.findById(request.getSessionId())
                .orElseThrow(() -> new RuntimeException("Session not found"));


        dokoSession.updateNextDealer();

        for (DokoSessionPlayer sp: dokoSession.getSessionPlayers()){
            sp.setScore(sp.getScore() + request.getSeatScores().get(sp.getSeat()).getScore());
        }


        DokoGame dokoGame = new DokoGame();
        setValuesFromRequest(dokoGame, request);
        dokoGame.setDokoSession(dokoSession);

        dokoGame.setBock(dokoSession.useBock());
        if (request.isMoreBock()){
            dokoSession.addBock();
        }

        calculateWinnerAndScores(dokoGame);

        dokoSessionRepository.save(dokoSession);
        return dokoGameRepository.save(dokoGame);
    }

    @Override
    @Transactional
    public DokoGame updateGame(Long gameId, CreateDokoGameRequest request) { // TODO handle Bock
        // Retrieve existing game
        DokoGame dokoGame = dokoGameRepository.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Game not found"));

        // Retrieve associated session if any fields related to it need updating
        DokoSession dokoSession = dokoGame.getDokoSession();

        // Update fields on dokoGame based on request
        setValuesFromRequest(dokoGame, request);

//        // Update the scores (or any other additional logic)
//        for (DokoSessionPlayer sp: dokoSession.getSessionPlayers()) {
//            sp.setScore(sp.getScore() + request.getSeatScores().get(sp.getSeat()).getScore());
//        }
//
//        dokoGame.setSeatScores(request.getSeatScores());
        calculateWinnerAndScores(dokoGame);
        // Persist changes
        //dokoSessionRepository.save(dokoSession); // if dokoSession was modified
        return dokoGameRepository.save(dokoGame);
    }


    @Override
    public DokoGame validateGame(CreateDokoGameRequest request) {
        DokoSession dokoSession = dokoSessionRepository.findById(request.getSessionId())
                .orElseThrow(() -> new RuntimeException("Session not found"));


        dokoSession.updateNextDealer();
        for (DokoSessionPlayer sp: dokoSession.getSessionPlayers()){
            sp.setScore(sp.getScore() + request.getSeatScores().get(sp.getSeat()).getScore());
        }


        DokoGame dokoGame = new DokoGame();
        setValuesFromRequest(dokoGame, request);

        dokoGame.setBock(dokoSession.useBock());
        if (request.isMoreBock()){
            dokoSession.addBock();
        }

        dokoGame.setDokoSession(dokoSession);


        // TODO Validierungen
        // TODO Sonderpunkte

        calculateWinnerAndScores(dokoGame);

        return dokoGame;

    }

    private void setValuesFromRequest(DokoGame dokoGame, CreateDokoGameRequest request){
        dokoGame.setDealer(request.getDealer());
        dokoGame.setSoloPlayer(request.getSoloPlayer());
        dokoGame.setBock(request.isBock()); // will get overwritten in most cases
        dokoGame.setMoreBock(request.isMoreBock());
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
