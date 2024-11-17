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

    @Column(name = "bock_remaining", nullable = false, columnDefinition = "integer default 0")
    private int bockRemaining;


    public void addSessionPlayer(DokoPlayer player, int seat, int score) {
        DokoSessionPlayer sessionPlayer = new DokoSessionPlayer(this, player, seat, score);
        sessionPlayers.add(sessionPlayer);
        player.getSessionPlayers().add(sessionPlayer);
    }

    public void updateNextDealer(){
        nextDealer++;
        nextDealer = nextDealer % sessionPlayers.size();
    }

    public void removeBock(){
        bockRemaining -= sessionPlayers.size();
    }

    public void addBock(){
        bockRemaining += sessionPlayers.size();
    }

    public void addSingleBock(){
        bockRemaining += 1;
    }

    public boolean useBock(){
        if (bockRemaining > 0){
            bockRemaining -= 1;
            return true;
        }
        return false;
    }

}
