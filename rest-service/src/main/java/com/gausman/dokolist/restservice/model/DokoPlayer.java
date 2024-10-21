package com.gausman.dokolist.restservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Setter
@Getter
public class DokoPlayer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private String email;

    @OneToMany(mappedBy = "founder")
    @JsonIgnore
    private Set<DokoGroup> foundedGroups;

    @ManyToMany(mappedBy = "players")
    @JsonIgnore
    private Set<DokoGroup> groups = new HashSet<>();

    @OneToMany(mappedBy = "player", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<DokoSessionPlayer> sessionPlayers = new ArrayList<>();
}
