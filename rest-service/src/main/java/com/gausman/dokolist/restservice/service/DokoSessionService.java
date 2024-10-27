package com.gausman.dokolist.restservice.service;

import com.gausman.dokolist.restservice.dto.CreateDokoSessionRequest;
import com.gausman.dokolist.restservice.model.DokoSession;

import java.util.List;

public interface DokoSessionService {
    DokoSession findById(Long id);
    List<DokoSession> findAll();

    List<DokoSession> findAllByGroupId(Long groupId);

    DokoSession createSession(CreateDokoSessionRequest request);
}
