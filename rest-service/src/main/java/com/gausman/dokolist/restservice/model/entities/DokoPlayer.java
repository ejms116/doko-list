package com.gausman.dokolist.restservice.model.entities;

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
@Table(indexes = @Index(name = "idx_kinde_id", columnList = "kindeId"))
public class DokoPlayer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

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
