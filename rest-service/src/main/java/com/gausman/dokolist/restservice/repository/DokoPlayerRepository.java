package com.gausman.dokolist.restservice.repository;

import com.gausman.dokolist.restservice.model.entities.DokoPlayer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DokoPlayerRepository extends JpaRepository<DokoPlayer,Long> {
    DokoPlayer findByKindeId(String kindeId);
}
