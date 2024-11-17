package com.gausman.dokolist.restservice.service.impl;

import com.gausman.dokolist.restservice.model.entities.DokoPlayer;
import com.gausman.dokolist.restservice.repository.DokoPlayerRepository;
import com.gausman.dokolist.restservice.service.DokoPlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DokoPlayerServiceImpl implements DokoPlayerService {
    @Autowired
    DokoPlayerRepository dokoPlayerRepository;

    @Override
    public DokoPlayer save(DokoPlayer dokoPlayer) {
        return dokoPlayerRepository.save(dokoPlayer);
    }

    @Override
    public List<DokoPlayer> findAll() {
        return dokoPlayerRepository.findAll();
    }

    @Override
    public DokoPlayer getByKindeId(String id) {
        return dokoPlayerRepository.findByKindeId(id);
    }
}
