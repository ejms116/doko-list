package com.gausman.dokolist.restservice.service;

import com.gausman.dokolist.restservice.dto.CreateDokoGameRequest;
import com.gausman.dokolist.restservice.dto.DokoGameResponse;
import com.gausman.dokolist.restservice.model.entities.DokoGame;

import java.util.List;
import java.util.Optional;

public interface DokoGameService {
    Optional<DokoGame> findById(Long gameId);
    List<DokoGame> findAll();
    List<DokoGame> findAllBySessionId(Long sessionId);
    DokoGameResponse createGameTest(CreateDokoGameRequest request);
    DokoGameResponse createGameAndPersist(CreateDokoGameRequest request);
    DokoGameResponse updateGameTest(Long gameId, CreateDokoGameRequest request);
    DokoGameResponse updateGameAndPersist(Long gameId, CreateDokoGameRequest request);
    Boolean deleteGame(Long gameId);
}
