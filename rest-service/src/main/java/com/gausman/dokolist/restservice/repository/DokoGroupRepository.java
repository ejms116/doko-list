package com.gausman.dokolist.restservice.repository;

import com.gausman.dokolist.restservice.model.entities.DokoGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DokoGroupRepository extends JpaRepository<DokoGroup,Long> {
    @Query("SELECT g FROM DokoGroup g JOIN g.players p WHERE p.id = :playerId")
    List<DokoGroup> findAllByPlayerId(@Param("playerId") Long playerId);
}

