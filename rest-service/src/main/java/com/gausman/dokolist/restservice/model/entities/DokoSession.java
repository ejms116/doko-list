package com.gausman.dokolist.restservice.model.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class DokoSession {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private DokoGroup dokoGroup;

    @CreationTimestamp
    private Instant played;

    private String location;

    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("seat ASC")
    private List<DokoSessionPlayer> sessionPlayers = new ArrayList<>();

    @Column(name = "next_dealer", nullable = false, columnDefinition = "integer default 0")
    private int nextDealer;


    public void addSessionPlayer(DokoPlayer player, int seat, int score) {
        DokoSessionPlayer sessionPlayer = new DokoSessionPlayer(this, player, seat, score);
        sessionPlayers.add(sessionPlayer);
        player.getSessionPlayers().add(sessionPlayer);
    }

}
