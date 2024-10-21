package com.gausman.dokolist.restservice.repository;

import com.gausman.dokolist.restservice.model.DokoSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DokoSessionRepository extends JpaRepository<DokoSession,Long> {
}
