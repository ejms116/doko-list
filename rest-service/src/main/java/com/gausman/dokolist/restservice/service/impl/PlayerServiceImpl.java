package com.gausman.dokolist.restservice.service.impl;

import com.gausman.dokolist.restservice.model.Player;
import com.gausman.dokolist.restservice.repository.PlayerRepository;
import com.gausman.dokolist.restservice.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerServiceImpl implements PlayerService {
    @Autowired
    PlayerRepository playerRepository;

    @Override
    public Player save(Player player) {
        return playerRepository.save(player);
    }

    @Override
    public List<Player> findAll() {
        return playerRepository.findAll();
    }
}
