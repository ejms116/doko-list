package com.gausman.dokolist.restservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "session_player")
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
    @JsonIgnore
    private DokoPlayer player;

    private int score;

    // Constructors, Getters, Setters
    public DokoSessionPlayer() {}

    public DokoSessionPlayer(DokoSession session, DokoPlayer player, int score) {
        this.session = session;
        this.player = player;
        this.score = score;
        this.id = new SessionPlayerId(session.getId(), player.getId());
    }


}
