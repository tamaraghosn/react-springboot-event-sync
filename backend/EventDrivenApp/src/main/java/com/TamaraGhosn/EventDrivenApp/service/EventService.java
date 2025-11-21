package com.TamaraGhosn.EventDrivenApp.service;


import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class EventService {

    private final Map<String, String> labelStore = new ConcurrentHashMap<>();

    public void processTextEvent(String tabId, String text){
        String random = UUID.randomUUID().toString().substring(0,5);
        String result = text + "--" + random;
        labelStore.put(tabId, result);
    }

    public  String getLabel(String tabId) {
        return labelStore.getOrDefault(tabId, "no data");
    }
}
