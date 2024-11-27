package com.gausman.dokolist.restservice.service;

import com.gausman.dokolist.restservice.model.entities.DokoPlayer;

import java.util.List;
import java.util.Optional;

public interface DokoPlayerService {
    DokoPlayer save(DokoPlayer dokoPlayer);
    List<DokoPlayer> findAll();
    Optional<DokoPlayer> findByEmail(String email);

    Optional<DokoPlayer> finbdById(Long id);

}
