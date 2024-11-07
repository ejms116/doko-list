package com.gausman.dokolist.restservice.controller;

import com.gausman.dokolist.restservice.dto.CreateDokoSessionRequest;
import com.gausman.dokolist.restservice.model.entities.DokoSession;
import com.gausman.dokolist.restservice.service.DokoSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/groups")
public class DokoSessionController {
    @Autowired
    private DokoSessionService dokoSessionService;

    @GetMapping("/sessions/{id}")
    public ResponseEntity<DokoSession> findById(@PathVariable Long id){
        DokoSession dokoSession = dokoSessionService.findById(id);
        if (dokoSession == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dokoSession);
    }

    @GetMapping("/sessions/all")
    public ResponseEntity<List<DokoSession>> findAll(){
        List<DokoSession> dokoSessions = dokoSessionService.findAll();

        if (dokoSessions == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dokoSessions);
    }

    @GetMapping("/{groupId}/sessions")
    public ResponseEntity<List<DokoSession>> findAllByGroupId(@PathVariable Long groupId){
        List<DokoSession> dokoSessions = dokoSessionService.findAllByGroupId(groupId);

        if (dokoSessions == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dokoSessions);
    }

    @PostMapping("/sessions/create")
    public ResponseEntity<DokoSession> create(@RequestBody CreateDokoSessionRequest request){
        DokoSession session = dokoSessionService.createSession(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(session);
    }

}
