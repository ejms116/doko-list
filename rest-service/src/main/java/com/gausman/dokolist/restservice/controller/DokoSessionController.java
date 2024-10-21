package com.gausman.dokolist.restservice.controller;

import com.gausman.dokolist.restservice.dto.CreateDokoSessionRequest;
import com.gausman.dokolist.restservice.model.DokoSession;
import com.gausman.dokolist.restservice.service.DokoSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/groups/sessions")
public class DokoSessionController {
    @Autowired
    private DokoSessionService dokoSessionService;

    @GetMapping("/{id}")
    public ResponseEntity<DokoSession> findById(@PathVariable Long id){
        DokoSession dokoSession = dokoSessionService.findById(id);
        if (dokoSession == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dokoSession);
    }

    @PostMapping("/create")
    public ResponseEntity<DokoSession> create(@RequestBody CreateDokoSessionRequest request){
        DokoSession session = dokoSessionService.createSession(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(session);
    }

}
