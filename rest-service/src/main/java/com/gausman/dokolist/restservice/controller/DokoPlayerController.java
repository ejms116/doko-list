package com.gausman.dokolist.restservice.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.gausman.dokolist.restservice.model.entities.DokoPlayer;
import com.gausman.dokolist.restservice.model.entities.Views;
import com.gausman.dokolist.restservice.service.DokoPlayerService;
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
@RequestMapping("/players")
public class DokoPlayerController {
    @Autowired
    private DokoPlayerService dokoPlayerService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/add")
    public DokoPlayer save(@RequestBody DokoPlayer dokoPlayer){
        return dokoPlayerService.save(dokoPlayer);
    }

    @GetMapping("/{playerId}")
    @JsonView(Views.Public.class)
    public ResponseEntity<DokoPlayer> findById(@PathVariable Long playerId){
        Optional<DokoPlayer> dokoPlayer = dokoPlayerService.finbdById(playerId);

        if (dokoPlayer.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(dokoPlayer.get());
    }

    @GetMapping("/all")
    @JsonView(Views.Public.class)
    public List<DokoPlayer> findAll(){
        return dokoPlayerService.findAll();
    }

    @GetMapping("/get")
    @JsonView(Views.Private.class)
    public ResponseEntity<DokoPlayer> findByEmail(
            @RequestBody DokoPlayer body,
            HttpServletRequest httpServletRequest
    ) {
        String authHeader = httpServletRequest.getHeader(AUTHORIZATION);
        String token = authHeader.substring(7);
        String userEmail = jwtService.extractUsername(token);

        if (!body.getEmail().equals(userEmail)) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .build();
        }
        Optional<DokoPlayer> dokoPlayer = dokoPlayerService.findByEmail(body.getEmail());

        // Remove Emails of other users
        dokoPlayer.ifPresent(player -> player.getGroups().forEach(dokoGroup ->
                dokoGroup.getPlayers().forEach(dokoPlayer1 -> {
                    if (!(dokoPlayer1.getEmail().equals(userEmail))) {
                        dokoPlayer1.setEmail(null);
                    }
                })
        ));


        return dokoPlayer.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .build());


    }
}
