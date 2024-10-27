package com.gausman.dokolist.restservice.model.entities;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@Setter
public class SessionPlayerId implements Serializable {
    private Long sessionId;
    private Long playerId;

    public SessionPlayerId(){};

    public SessionPlayerId(Long sessionId, Long playerId) {
        this.sessionId = sessionId;
        this.playerId = playerId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof SessionPlayerId that)) return false;
        return sessionId.equals(that.sessionId) && playerId.equals(that.playerId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(sessionId, playerId);
    }
}
