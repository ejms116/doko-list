package com.gausman.dokolist.restservice.service.impl;

import com.gausman.dokolist.restservice.dto.CreateDokoGameRequest;
import com.gausman.dokolist.restservice.model.entities.DokoGame;
import com.gausman.dokolist.restservice.model.entities.DokoSession;
import com.gausman.dokolist.restservice.model.entities.DokoSessionPlayer;
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
        return dokoGameRepository.findByDokoSession_Id(sessionId);
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
        dokoGame.setDokoSession(dokoSession);
        dokoGame.setDealer(request.getDealer());
        dokoGame.setBock(request.isBock());
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

        dokoSessionRepository.save(dokoSession);
        return dokoGameRepository.save(dokoGame);
    }
}
