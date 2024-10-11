package com.gausman.dokolist.restservice.service;

import com.gausman.dokolist.restservice.model.Player;

import java.util.List;

public interface PlayerService {
    Player save(Player player);

    List<Player> findAll();
}
