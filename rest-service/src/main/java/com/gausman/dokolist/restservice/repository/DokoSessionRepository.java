package com.gausman.dokolist.restservice.repository;

import com.gausman.dokolist.restservice.model.entities.DokoSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DokoSessionRepository extends JpaRepository<DokoSession,Long> {
    List<DokoSession> findByDokoGroup_IdOrderByPlayedAsc(Long groupId);
}
