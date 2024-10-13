package com.gausman.dokolist.restservice.service.impl;

import com.gausman.dokolist.restservice.model.DokoGroup;
import com.gausman.dokolist.restservice.model.DokoPlayer;
import com.gausman.dokolist.restservice.repository.DokoGroupRepository;
import com.gausman.dokolist.restservice.repository.DokoPlayerRepository;
import com.gausman.dokolist.restservice.service.DokoGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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


}
