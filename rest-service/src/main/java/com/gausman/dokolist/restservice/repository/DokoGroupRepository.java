package com.gausman.dokolist.restservice.repository;

import com.gausman.dokolist.restservice.model.entities.DokoGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DokoGroupRepository extends JpaRepository<DokoGroup,Long> {
}

