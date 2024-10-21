package com.gausman.dokolist.restservice.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CreateDokoSessionRequest {
    private Long groupId;
    private String location;
    private List<Long> playerIds;


}
