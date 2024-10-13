package com.gausman.dokolist.restservice.service;

import com.gausman.dokolist.restservice.model.DokoGroup;
import com.gausman.dokolist.restservice.model.DokoPlayer;

import java.util.List;

public interface DokoGroupService {
    DokoGroup save(DokoGroup dokoGroup);
    List<DokoGroup> findAll();

    DokoGroup findById(Long id);

    void addPlayersToGroup(Long groupId, List<Long> playerIds);
}
