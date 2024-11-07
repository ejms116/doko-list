package com.gausman.dokolist.restservice.repository;

import com.gausman.dokolist.restservice.model.entities.DokoGame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DokoGameRepository extends JpaRepository<DokoGame,Long> {
    List<DokoGame> findByDokoSession_IdOrderByPlayedAsc(Long sessionId);
}
