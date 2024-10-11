package com.gausman.dokolist.restservice.service;

import com.gausman.dokolist.restservice.model.DokoPlayer;

import java.util.List;

public interface DokoPlayerService {
    DokoPlayer save(DokoPlayer dokoPlayer);

    List<DokoPlayer> findAll();
}