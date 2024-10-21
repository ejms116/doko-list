package com.gausman.dokolist.restservice.service.impl;

import com.gausman.dokolist.restservice.dto.CreateDokoSessionRequest;
import com.gausman.dokolist.restservice.model.DokoGroup;
import com.gausman.dokolist.restservice.model.DokoPlayer;
import com.gausman.dokolist.restservice.model.DokoSession;
import com.gausman.dokolist.restservice.repository.DokoGroupRepository;
import com.gausman.dokolist.restservice.repository.DokoPlayerRepository;
import com.gausman.dokolist.restservice.repository.DokoSessionRepository;
import com.gausman.dokolist.restservice.service.DokoSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class DokoSessionServiceImpl implements DokoSessionService {
    @Autowired
    DokoGroupRepository dokoGroupRepository;

    @Autowired
    DokoSessionRepository dokoSessionRepository;

    @Autowired
    DokoPlayerRepository dokoPlayerRepository;

    @Override
    public DokoSession findById(Long id) {
        return dokoSessionRepository.findById(id).orElse(null);
    }

    @Override
    public DokoSession createSession(CreateDokoSessionRequest request) {
        DokoGroup group = dokoGroupRepository.findById(request.getGroupId())
                .orElseThrow(() -> new RuntimeException("Group not found"));

        DokoSession session = new DokoSession();

        Set<DokoPlayer> dokoPlayerSet = new HashSet<>(dokoPlayerRepository.findAllById(request.getPlayerIds()));

        for (DokoPlayer dokoPlayer: dokoPlayerSet){
            session.addSessionPlayer(dokoPlayer, 0);
        }

        session.setDokoGroup(group);
        session.setLocation(request.getLocation());

        return dokoSessionRepository.save(session);
    }
}