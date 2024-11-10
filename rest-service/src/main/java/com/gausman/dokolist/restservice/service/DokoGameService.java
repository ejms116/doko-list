package com.gausman.dokolist.restservice.service;

import com.gausman.dokolist.restservice.dto.CreateDokoGameRequest;
import com.gausman.dokolist.restservice.dto.DokoGameResponse;
import com.gausman.dokolist.restservice.model.entities.DokoGame;

import java.util.List;

public interface DokoGameService {
    List<DokoGame> findAll();
    List<DokoGame> findAllBySessionId(Long sessionId);
    DokoGameResponse createGame(CreateDokoGameRequest request);
    DokoGameResponse updateGame(Long gameId, CreateDokoGameRequest request);
}
