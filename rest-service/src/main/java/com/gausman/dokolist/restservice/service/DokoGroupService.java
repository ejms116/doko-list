package com.gausman.dokolist.restservice.service;

import com.gausman.dokolist.restservice.dto.CreateGroupRequest;
import com.gausman.dokolist.restservice.model.entities.DokoGroup;

import java.util.List;
import java.util.Optional;

public interface DokoGroupService {
    DokoGroup save(DokoGroup dokoGroup);
    List<DokoGroup> findAll();
    List<DokoGroup> findAllGroupsForPlayer(Long playerId);
    DokoGroup findById(Long id);
    DokoGroup createGroup(CreateGroupRequest createGroupRequest, String email);
    DokoGroup changeGroup(Long groupId, CreateGroupRequest createGroupRequest);
    boolean isPlayerInGroupByEmail(String email, Long groupId);
}
