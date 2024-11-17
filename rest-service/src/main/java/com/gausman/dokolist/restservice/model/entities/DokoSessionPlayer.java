package com.gausman.dokolist.restservice.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "session_player", indexes = {
        @Index(name = "idx_session_id", columnList = "session_id")
})
@Getter
@Setter
public class DokoSessionPlayer {
    @EmbeddedId
    private SessionPlayerId id;

    @ManyToOne
    @MapsId("sessionId")
    @JoinColumn(name = "session_id")
    @JsonIgnore
    private DokoSession session;

    @ManyToOne
    @MapsId("playerId")
    @JoinColumn(name = "player_id")
    private DokoPlayer player;

    private int seat;

    private int score;

    public DokoSessionPlayer() {}

    public DokoSessionPlayer(DokoSession session, DokoPlayer player,int seat, int score) {
        this.session = session;
        this.player = player;
        this.score = score;
        this.seat = seat;
        this.id = new SessionPlayerId(session.getId(), player.getId());
    }


}
