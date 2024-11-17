package com.gausman.dokolist.restservice.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AddPlayersToGroupRequest {
    private List<Long> playerIds;

}
