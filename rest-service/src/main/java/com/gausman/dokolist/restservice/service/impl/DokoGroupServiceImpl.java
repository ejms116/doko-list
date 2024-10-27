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
    public DokoGroup findById(Long id) {
        return dokoGroupRepository.findById(id).orElse(null);
    }



    @Override
    public void addPlayersToGroup(Long groupId, List<Long> playerIds) {
        DokoGroup dokoGroup = dokoGroupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("DokoGroup not found"));

        for (Long playerId : playerIds) {
            DokoPlayer dokoPlayer = dokoPlayerRepository.findById(playerId)
                    .orElseThrow(() -> new RuntimeException("DokoPlayer not found"));
            dokoGroup.addPlayer(dokoPlayer);
        }

        dokoGroupRepository.save(dokoGroup);  // Save the updated team

    }

    @Override
    public DokoGroup createGroup(CreateGroupRequest createGroupRequest) {
        DokoPlayer founder = dokoPlayerRepository.findById(createGroupRequest.getFounderId())
                .orElseThrow(() -> new RuntimeException("Player not found"));

        Set<DokoPlayer> dokoPlayerSet = new HashSet<>(dokoPlayerRepository.findAllById(createGroupRequest.getPlayerIds()));

        DokoGroup dokoGroup = new DokoGroup();
        dokoGroup.setName(createGroupRequest.getName());
        dokoGroup.setFounder(founder);
        dokoGroup.setPlayers(dokoPlayerSet);

        return dokoGroupRepository.save(dokoGroup);
    }


}
