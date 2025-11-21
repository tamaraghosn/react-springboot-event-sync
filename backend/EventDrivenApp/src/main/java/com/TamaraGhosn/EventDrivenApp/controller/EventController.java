package com.TamaraGhosn.EventDrivenApp.controller;


import com.TamaraGhosn.EventDrivenApp.dto.TextEventRequest;
import com.TamaraGhosn.EventDrivenApp.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/events")
@CrossOrigin
@RequiredArgsConstructor
public class EventController {

    private  final EventService eventService;


    @PostMapping("/text")
    public void receiveTextEvent(@RequestBody TextEventRequest request) {

        eventService.processTextEvent(request.getTabId(), request.getText());
    }


    @GetMapping("/label")
    public Map<String, String> getLabel(@RequestParam String tabId){

        String label = eventService.getLabel(tabId);

        //creates a response with a small JSOn object format
        return Map.of("label", label);

    }

}
