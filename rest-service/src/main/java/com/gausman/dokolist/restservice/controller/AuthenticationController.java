package com.gausman.dokolist.restservice.controller;

import com.gausman.dokolist.restservice.dto.AuthenticationRequest;
import com.gausman.dokolist.restservice.dto.AuthenticationResponse;
import com.gausman.dokolist.restservice.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/authenticate2")
    public ResponseEntity<AuthenticationResponse> authenticate2(Authentication authentication){
        return ResponseEntity.ok(service.authenticate2(authentication));
    }
}
