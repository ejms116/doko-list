package com.gausman.dokolist.restservice.dto;

import com.gausman.dokolist.restservice.model.enums.DokoParty;
import com.gausman.dokolist.restservice.model.enums.DokoSonderpunktType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateDokoSonderpunkt {
    private DokoParty dokoParty;
    private DokoSonderpunktType type;
}
