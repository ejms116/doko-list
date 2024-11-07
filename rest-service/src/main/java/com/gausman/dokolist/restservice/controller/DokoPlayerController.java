package com.gausman.dokolist.restservice.controller;

import com.gausman.dokolist.restservice.model.entities.DokoPlayer;
import com.gausman.dokolist.restservice.service.DokoPlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/players")
public class DokoPlayerController {
    @Autowired
    private DokoPlayerService dokoPlayerService;

    @PostMapping("/add")
    public DokoPlayer save(@RequestBody DokoPlayer dokoPlayer){
        return dokoPlayerService.save(dokoPlayer);
    }

    @GetMapping("/all")
    public List<DokoPlayer> findAll(){
        return dokoPlayerService.findAll();
    }
}
