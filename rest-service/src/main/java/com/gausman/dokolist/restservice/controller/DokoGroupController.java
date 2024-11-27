package com.gausman.dokolist.restservice.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.gausman.dokolist.restservice.dto.AddPlayersToGroupRequest;
import com.gausman.dokolist.restservice.dto.CreateGroupRequest;
import com.gausman.dokolist.restservice.model.entities.DokoGroup;
import com.gausman.dokolist.restservice.model.entities.Views;
import com.gausman.dokolist.restservice.service.DokoGroupService;
import com.gausman.dokolist.restservice.service.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;

@RestController
@RequestMapping("/groups")
public class DokoGroupController {
    @Autowired
    private DokoGroupService dokoGroupService;

    @Autowired
    private JwtService jwtService;



    @GetMapping("/all")
    @JsonView(Views.Public.class)
    public List<DokoGroup> findAll(){
        return dokoGroupService.findAll();
    }

    @GetMapping("/{id}")
    @JsonView(Views.Public.class)
    public ResponseEntity<DokoGroup> findById(@PathVariable Long id){
        DokoGroup dokoGroup = dokoGroupService.findById(id);
        if (dokoGroup == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dokoGroup);
    }

    @GetMapping("/my/{playerId}")
    @JsonView(Views.Public.class)
    public ResponseEntity<List<DokoGroup>> findAllGroupsForPlayer(@PathVariable Long playerId){
        List<DokoGroup> dokoGroups = dokoGroupService.findAllGroupsForPlayer(playerId);

        if (dokoGroups.isEmpty()){
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .build();
        }

        return ResponseEntity.ok(dokoGroups);
    }

    @PostMapping("/create")
    public ResponseEntity<DokoGroup> create(
            @RequestBody CreateGroupRequest createGroupRequest,
            HttpServletRequest request
    ){
        String authHeader = request.getHeader(AUTHORIZATION);
        String token = authHeader.substring(7);
        String userEmail = jwtService.extractUsername(token);

        DokoGroup dokoGroup = dokoGroupService.createGroup(createGroupRequest, userEmail);
        return ResponseEntity.status(HttpStatus.CREATED).body(dokoGroup);
    }



    @PostMapping("/{groupId}/change")
    public ResponseEntity<DokoGroup> addPlayersToGroup(
            @PathVariable Long groupId,
            @RequestBody CreateGroupRequest request,
            HttpServletRequest httpServletRequest
    ){
        try {
            String authHeader = httpServletRequest.getHeader(AUTHORIZATION);
            String token = authHeader.substring(7);
            String userEmail = jwtService.extractUsername(token);

            // Auth check
            if (!dokoGroupService.isPlayerInGroupByEmail(userEmail, groupId)){
                return ResponseEntity
                        .status(FORBIDDEN)
                        .build();
            }

            DokoGroup dokoGroup = dokoGroupService.changeGroup(groupId, request);
            return ResponseEntity.ok(dokoGroup);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


}
