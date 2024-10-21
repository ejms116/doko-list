package com.gausman.dokolist.restservice.model;

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
    private List<DokoSessionPlayer> sessionPlayers = new ArrayList<>();

    // Add convenience method
    public void addSessionPlayer(DokoPlayer player, int score) {
        DokoSessionPlayer sessionPlayer = new DokoSessionPlayer(this, player, score);
        sessionPlayers.add(sessionPlayer);
        player.getSessionPlayers().add(sessionPlayer);
    }

//    @ManyToMany
//    @JoinTable(
//            name = "session_player",
//            joinColumns = @JoinColumn(name = "session_id"),
//            inverseJoinColumns = @JoinColumn(name = "player_id")
//    )
//    private ArrayList<DokoPlayer> players = new ArrayList<>();

}
