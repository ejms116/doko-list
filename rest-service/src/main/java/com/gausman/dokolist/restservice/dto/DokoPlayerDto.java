package com.gausman.dokolist.restservice.dto;

import com.gausman.dokolist.restservice.model.entities.DokoGroup;
import lombok.Data;

import java.util.List;

@Data
public class DokoPlayerDto {
    private Long id;
    private String username;
    private String email; // Include email if allowed
    private List<DokoGroup> groups;
}
