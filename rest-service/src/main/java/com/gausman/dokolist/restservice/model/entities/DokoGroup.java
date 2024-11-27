package com.gausman.dokolist.restservice.model.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Entity
@Setter
@Getter
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class DokoGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonView(Views.Public.class)
    private Long id;

    @JsonView(Views.Public.class)
    private String name;

    @ManyToMany
    @JoinTable(
            name = "group_player",  // Name of the join table
            joinColumns = @JoinColumn(name = "group_id"),  // Foreign key for Group
            inverseJoinColumns = @JoinColumn(name = "player_id")  // Foreign key for Player
    )
    @OrderBy("id ASC")
    @JsonView(Views.Public.class)
    private Set<DokoPlayer> players = new HashSet<>();

    public void addPlayer(DokoPlayer dokoPlayer){
        players.add(dokoPlayer);
    }

    @ManyToOne
    @JoinColumn(name = "founder_id")
    @JsonView(Views.Public.class)
    private DokoPlayer founder;

    @CreationTimestamp
    @JsonView(Views.Public.class)
    private Instant founded;

    @JsonView(Views.Public.class)
    private int sessionCount = 0;

    public void addSession(DokoSession session){
        sessionCount++;
    }

}
