package com.gausman.dokolist.restservice.repository;

import com.gausman.dokolist.restservice.model.entities.DokoPlayer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DokoPlayerRepository extends JpaRepository<DokoPlayer,Long> {
    Optional<DokoPlayer> findByEmail(String email);
}
