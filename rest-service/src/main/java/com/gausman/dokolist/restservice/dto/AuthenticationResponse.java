package com.gausman.dokolist.restservice.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.gausman.dokolist.restservice.model.entities.DokoPlayer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    @JsonProperty("access_token")
    private String accessToken;
    @JsonProperty("refresh_token")
    private String refreshToken;
    private String message;
    private DokoPlayer dokoPlayer;
}
