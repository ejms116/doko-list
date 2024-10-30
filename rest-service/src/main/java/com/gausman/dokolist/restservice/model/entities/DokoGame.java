package com.gausman.dokolist.restservice.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gausman.dokolist.restservice.model.enums.DokoGameType;
import com.gausman.dokolist.restservice.model.enums.DokoParty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@Entity
@Getter
@Setter
public class DokoGame {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "session_id")
    @JsonIgnore
    private DokoSession dokoSession;

    @CreationTimestamp
    private Instant played;

    private int dealer; // reference to the seat number in DokoSession

    public int getLead() {
        if (seatScores.isEmpty()) {
            return dealer + 1;
        }
        return (dealer + 1) % seatScores.size();
    }

    @ElementCollection
    @CollectionTable(name = "doko_game_seats", joinColumns = @JoinColumn(name = "doko_game_id"))
    @MapKeyColumn(name = "seat_number") // This will be the key of the HashMap
    private Map<Integer, DokoGameSeat> seatScores = new HashMap<>();

    private int soloPlayer;
    private boolean moreBock = false;
    private boolean bock = false;
    private DokoGameType dokoGameType = DokoGameType.NORMAL;
    private DokoParty winParty;
    private DokoParty resultParty;
    private int resultValue;
    private boolean ansageRe = false;
    private boolean ansageReVorab = false;
    private boolean ansageContra = false;
    private boolean ansageContraVorab = false;
    private DokoParty weitereAnsagenParty = DokoParty.Inaktiv;
    private int ansage = -1;
    private int ansageVorab = -1;

    // TODO Sonderpunkte probably in a new table

}
