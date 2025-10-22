package com.gausman.dokolist.restservice.controller;

import com.gausman.dokolist.restservice.dto.CreateDokoGameRequest;
import com.gausman.dokolist.restservice.dto.DokoGameResponse;
import com.gausman.dokolist.restservice.model.entities.DokoGame;
import com.gausman.dokolist.restservice.model.entities.DokoSession;
import com.gausman.dokolist.restservice.service.DokoGameService;
import com.gausman.dokolist.restservice.service.DokoGroupService;
import com.gausman.dokolist.restservice.service.DokoSessionService;
import com.gausman.dokolist.restservice.service.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController
@RequestMapping("/groups/sessions")
public class DokoGameController {
    @Autowired
    private DokoGameService dokoGameService;

    @Autowired
    private DokoSessionService dokoSessionService;

    @Autowired
    private DokoGroupService dokoGroupService;

    @Autowired
    private JwtService jwtService;

    @GetMapping("/games/all")
    private ResponseEntity<List<DokoGame>> findAll(){
        List<DokoGame> dokoGames = dokoGameService.findAll();

        if (dokoGames == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dokoGames);
    }

    @GetMapping("/{sessionId}/games")
    private ResponseEntity <List<DokoGame>> findAllBySessionId(@PathVariable Long sessionId){
        List<DokoGame> dokoGames = dokoGameService.findAllBySessionId(sessionId);

        if (dokoGames == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dokoGames);
    }

    @PostMapping("/games/create")
    public ResponseEntity<DokoGameResponse> create(
            @RequestBody CreateDokoGameRequest request,
            HttpServletRequest httpServletRequest

    ){

        if (!isAuthorized(httpServletRequest, request.getSessionId())){
            DokoGameResponse dokoGameResponse = new DokoGameResponse(null);
            dokoGameResponse.getErrors().add("Spieler ist nicht Teil der Gruppe.");
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body(dokoGameResponse);
        }
        DokoGameResponse response;
        if (request.isWriteToDb()){
            response = dokoGameService.createGameAndPersist(request);
        } else {
            response = dokoGameService.createGameTest(request);
        }
        if (!response.getErrors().isEmpty()){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(response);
        }
        if (request.isWriteToDb()){
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/games/{gameId}/update")
    public ResponseEntity<DokoGameResponse> update(
            @PathVariable Long gameId,
            @RequestBody CreateDokoGameRequest request,
            HttpServletRequest httpServletRequest

    ){
        if (!isAuthorized(httpServletRequest, request.getSessionId())){
            DokoGameResponse dokoGameResponse = new DokoGameResponse(null);
            dokoGameResponse.getErrors().add("Spieler ist nicht Teil der Gruppe.");
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body(dokoGameResponse);
        }
        DokoGameResponse response;
        if (request.isWriteToDb()){
            response = dokoGameService.updateGameAndPersist(gameId, request);
        } else {
            response = dokoGameService.updateGameTest(gameId, request);
        }
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping("/games/{gameId}")
    public ResponseEntity<?> delete(@PathVariable Long gameId, HttpServletRequest httpServletRequest){
        Optional<DokoGame> dokoGame = dokoGameService.findById(gameId);

        if (dokoGame.isEmpty()){
            return ResponseEntity.notFound().build(); // 404
        }
        boolean deleted = dokoGameService.deleteGame(gameId);

        if (!isAuthorized(httpServletRequest, dokoGame.get().getDokoSession().getId())){
            DokoGameResponse dokoGameResponse = new DokoGameResponse(null);
            dokoGameResponse.getErrors().add("Spieler ist nicht Teil der Gruppe.");
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body(dokoGameResponse);
        }

        if (deleted){
            return ResponseEntity.noContent().build(); // 204
        } else {
            return ResponseEntity.notFound().build(); // 404
        }
    }

    private boolean isAuthorized(HttpServletRequest httpServletRequest, Long sessionId){
        String authHeader = httpServletRequest.getHeader(AUTHORIZATION);
        String token = authHeader.substring(7);
        String userEmail = jwtService.extractUsername(token);

        DokoSession dokoSession = dokoSessionService.findById(sessionId);

        return dokoGroupService.isPlayerInGroupByEmail(userEmail, dokoSession.getDokoGroup().getId());

    }

}
