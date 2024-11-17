package com.gausman.dokolist.restservice.service;

import com.gausman.dokolist.restservice.dto.CreateGroupRequest;
import com.gausman.dokolist.restservice.model.entities.DokoGroup;

import java.util.List;

public interface DokoGroupService {
    DokoGroup save(DokoGroup dokoGroup);
    List<DokoGroup> findAll();
    DokoGroup findById(Long id);
    void addPlayersToGroup(Long groupId, List<Long> playerIds);

    DokoGroup createGroup(CreateGroupRequest createGroupRequest);
}
