package com.gausman.dokolist.restservice.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gausman.dokolist.restservice.model.enums.DokoParty;
import com.gausman.dokolist.restservice.model.enums.DokoSonderpunktType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class DokoGameSonderpunkt {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "gameId", nullable = false)
    @JsonIgnore
    private DokoGame dokoGame;

    private DokoParty dokoParty;

    private DokoSonderpunktType type;

}
