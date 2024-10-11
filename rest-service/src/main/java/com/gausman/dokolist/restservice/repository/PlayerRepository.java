package com.gausman.dokolist.restservice.repository;

import com.gausman.dokolist.restservice.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends JpaRepository<Player,Long> {
}
