package com.gausman.dokolist.restservice.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CreateGroupRequest {
    private String name;
    private Long founderId;
    private List<Long> playerIds;
}
