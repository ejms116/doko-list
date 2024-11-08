package com.gausman.dokolist.restservice.service;

import com.gausman.dokolist.restservice.dto.CreateDokoGameRequest;
import com.gausman.dokolist.restservice.model.entities.DokoGame;

import java.util.List;

public interface DokoGameService {
    List<DokoGame> findAll();
    List<DokoGame> findAllBySessionId(Long sessionId);
    DokoGame createGame(CreateDokoGameRequest request);
    DokoGame updateGame(Long gameId, CreateDokoGameRequest request);
}
