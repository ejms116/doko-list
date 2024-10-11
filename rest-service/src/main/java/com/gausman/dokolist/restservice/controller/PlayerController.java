package com.gausman.dokolist.restservice.controller;

import com.gausman.dokolist.restservice.model.Player;
import com.gausman.dokolist.restservice.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/players")
public class PlayerController {
    @Autowired
    private PlayerService playerService;

    @PostMapping("/add")
    public Player save(@RequestBody Player player){
        return playerService.save(player);
    }

    @GetMapping("/all")
    public List<Player> findAll(){
        return playerService.findAll();
    }
}
