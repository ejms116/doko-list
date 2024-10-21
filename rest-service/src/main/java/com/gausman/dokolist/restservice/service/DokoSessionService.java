package com.gausman.dokolist.restservice.service;

import com.gausman.dokolist.restservice.dto.CreateDokoSessionRequest;
import com.gausman.dokolist.restservice.model.DokoSession;

public interface DokoSessionService {
    DokoSession findById(Long id);
    DokoSession createSession(CreateDokoSessionRequest request);
}
