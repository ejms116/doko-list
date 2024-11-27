package com.gausman.dokolist.restservice.service.impl;

import com.gausman.dokolist.restservice.dto.CreateGroupRequest;
import com.gausman.dokolist.restservice.model.entities.DokoGroup;
import com.gausman.dokolist.restservice.model.entities.DokoPlayer;
import com.gausman.dokolist.restservice.repository.DokoGroupRepository;
import com.gausman.dokolist.restservice.repository.DokoPlayerRepository;
import com.gausman.dokolist.restservice.service.DokoGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class DokoGroupServiceImpl implements DokoGroupService {
    @Autowired
    DokoGroupRepository dokoGroupRepository;

    @Autowired
    DokoPlayerRepository dokoPlayerRepository;

    @Override
    public DokoGroup save(DokoGroup dokoGroup) {
        return dokoGroupRepository.save(dokoGroup);
    }

    @Override
    public List<DokoGroup> findAll() {
        return dokoGroupRepository.findAll();
    }

    @Override
    public List<DokoGroup> findAllGroupsForPlayer(Long playerId) {
        return dokoGroupRepository.findAllByPlayerId(playerId);
    }

    @Override
    public DokoGroup findById(Long id) {
        return dokoGroupRepository.findById(id).orElse(null);
    }


    @Override
    public DokoGroup createGroup(CreateGroupRequest createGroupRequest, String email) {
        DokoPlayer founder = dokoPlayerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Player not found"));

        Set<DokoPlayer> dokoPlayerSet = new HashSet<>(dokoPlayerRepository.findAllById(createGroupRequest.getPlayerIds()));
        dokoPlayerSet.add(founder);

        DokoGroup dokoGroup = new DokoGroup();
        dokoGroup.setName(createGroupRequest.getName());
        dokoGroup.setFounder(founder);
        dokoGroup.setPlayers(dokoPlayerSet);

        return dokoGroupRepository.save(dokoGroup);
    }

    @Override
    public DokoGroup changeGroup(Long groupId, CreateGroupRequest createGroupRequest) {

        DokoGroup dokoGroup = dokoGroupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("DokoGroup not found"));

        for (Long playerId : createGroupRequest.getPlayerIds()) {
            DokoPlayer dokoPlayer = dokoPlayerRepository.findById(playerId)
                    .orElseThrow(() -> new RuntimeException("DokoPlayer not found"));
            dokoGroup.addPlayer(dokoPlayer);
        }

        dokoGroup.setName(createGroupRequest.getName());

        return dokoGroupRepository.save(dokoGroup);
    }

    @Override
    public boolean isPlayerInGroupByEmail(String email, Long groupId) {
        Optional<DokoPlayer> dokoPlayer = dokoPlayerRepository.findByEmail(email);
        Optional<DokoGroup> dokoGroup = dokoGroupRepository.findById(groupId);

        if (dokoPlayer.isEmpty() || dokoGroup.isEmpty()){
            return false;
        }

        return dokoGroup.get().getPlayers().contains(dokoPlayer.get());
    }


}
