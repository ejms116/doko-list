package com.gausman.dokolist.restservice.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.HashSet;
import java.util.Set;

@Entity
@Setter
@Getter
public class DokoGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @ManyToMany
    @JoinTable(
            name = "group_player",  // Name of the join table
            joinColumns = @JoinColumn(name = "group_id"),  // Foreign key for Group
            inverseJoinColumns = @JoinColumn(name = "player_id")  // Foreign key for Player
    )
    private Set<DokoPlayer> players = new HashSet<>();

    public void addPlayer(DokoPlayer dokoPlayer){
        players.add(dokoPlayer);
    }


}
