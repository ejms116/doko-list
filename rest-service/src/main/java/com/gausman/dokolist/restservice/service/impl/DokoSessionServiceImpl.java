package com.gausman.dokolist.restservice.service.impl;

import com.gausman.dokolist.restservice.dto.CreateDokoSessionRequest;
import com.gausman.dokolist.restservice.exception.SessionNotFoundException;
import com.gausman.dokolist.restservice.model.entities.DokoGroup;
import com.gausman.dokolist.restservice.model.entities.DokoPlayer;
import com.gausman.dokolist.restservice.model.entities.DokoSession;
import com.gausman.dokolist.restservice.repository.DokoGroupRepository;
import com.gausman.dokolist.restservice.repository.DokoPlayerRepository;
import com.gausman.dokolist.restservice.repository.DokoSessionRepository;
import com.gausman.dokolist.restservice.service.DokoSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
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
    public List<DokoSession> findAll() {
        return dokoSessionRepository.findAll();
    }

    @Override
    public List<DokoSession> findAllByGroupId(Long groupId) {
        return dokoSessionRepository.findByDokoGroup_IdOrderByPlayedAsc(groupId);
    }

    @Override
    @Transactional
    public DokoSession createSession(CreateDokoSessionRequest request) {
        DokoGroup group = dokoGroupRepository.findById(request.getGroupId())
                .orElseThrow(() -> new RuntimeException("Group not found"));

        DokoSession session = new DokoSession();

        Set<DokoPlayer> dokoPlayerSet = new HashSet<>(dokoPlayerRepository.findAllById(request.getPlayerIds()));

        // Remove all players that are not in the group
        dokoPlayerSet.retainAll(group.getPlayers());

        // keep the order of the playerIds input array and map it to the seat number
        // by using the index of the player in the request array
        for (DokoPlayer dokoPlayer: dokoPlayerSet){

            session.addSessionPlayer(dokoPlayer, request.getPlayerIds().indexOf(dokoPlayer.getId()), 0);
        }
        session.setDokoGroup(group);
        session.setLocation(request.getLocation());

        group.addSession(session);
        dokoGroupRepository.save(group);
        return dokoSessionRepository.save(session);
    }

    @Override
    public void deleteSessionById(Long id) {
        if (!dokoSessionRepository.existsById(id)) {
            throw new SessionNotFoundException("Session with ID " + id + " not found.");
        }
        dokoSessionRepository.deleteById(id);
    }


}
