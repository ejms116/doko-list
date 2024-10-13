package com.gausman.dokolist.restservice.controller;

import com.gausman.dokolist.restservice.dto.AddPlayersToGroupRequest;
import com.gausman.dokolist.restservice.model.DokoGroup;
import com.gausman.dokolist.restservice.model.DokoPlayer;
import com.gausman.dokolist.restservice.service.DokoGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/groups")
public class DokoGroupController {
    @Autowired
    private DokoGroupService dokoGroupService;

    @PostMapping("/add")
    public DokoGroup save(@RequestBody DokoGroup dokoGroup){
        return dokoGroupService.save(dokoGroup);
    }

    @GetMapping("/all")
    public List<DokoGroup> findAll(){
        return dokoGroupService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DokoGroup> findById(@PathVariable Long id){
        DokoGroup dokoGroup = dokoGroupService.findById(id);
        if (dokoGroup == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dokoGroup);
    }

    @PostMapping("/{groupId}/players")
    public ResponseEntity<String> addPlayersToGroup(@PathVariable Long groupId, @RequestBody AddPlayersToGroupRequest request){
        try {
            dokoGroupService.addPlayersToGroup(groupId, request.getPlayerIds());
            return ResponseEntity.ok("Players added to DokoGroup successfully");
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding DokoPlayers to DokoGroup: " + e.getMessage());
        }
    }


}