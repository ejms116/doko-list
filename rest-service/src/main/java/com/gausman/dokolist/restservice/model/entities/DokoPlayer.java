package com.gausman.dokolist.restservice.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gausman.dokolist.restservice.model.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Entity
@Setter
@Getter
@Builder
@Table(indexes = @Index(name = "idx_email", columnList = "email"))
@NoArgsConstructor
@AllArgsConstructor
public class DokoPlayer implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private String email;
    @JsonIgnore
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "founder")
    @JsonIgnore
    private Set<DokoGroup> foundedGroups;

    @ManyToMany(mappedBy = "players")
    @Builder.Default
    @JsonIgnore
    private Set<DokoGroup> groups = new HashSet<>();

    @OneToMany(mappedBy = "player", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    @JsonIgnore
    private List<DokoSessionPlayer> sessionPlayers = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
