package com.TamaraGhosn.EventDrivenApp.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TextEventRequest {

    private String tabId;
    private String text;


}
