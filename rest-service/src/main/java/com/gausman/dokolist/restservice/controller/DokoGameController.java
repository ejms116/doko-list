package com.gausman.dokolist.restservice.controller;

import com.gausman.dokolist.restservice.dto.CreateDokoGameRequest;
import com.gausman.dokolist.restservice.dto.DokoGameResponse;
import com.gausman.dokolist.restservice.model.entities.DokoGame;
import com.gausman.dokolist.restservice.service.DokoGameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/groups/sessions")
public class DokoGameController {
    @Autowired
    private DokoGameService dokoGameService;

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
    public ResponseEntity<DokoGameResponse> create(@RequestBody CreateDokoGameRequest request){
        DokoGameResponse response = dokoGameService.createGame(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/games/{gameId}/update")
    public ResponseEntity<DokoGameResponse> update(@PathVariable Long gameId, @RequestBody CreateDokoGameRequest request){
        DokoGameResponse response = dokoGameService.updateGame(gameId, request);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
