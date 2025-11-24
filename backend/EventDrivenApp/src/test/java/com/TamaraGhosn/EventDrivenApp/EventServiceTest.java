package com.TamaraGhosn.EventDrivenApp;

import com.TamaraGhosn.EventDrivenApp.service.EventService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class EventServiceTest {

    @Autowired
    private EventService eventService;

    @Test
    void test_LabelIsStored() {
        String tabId = "abc";
        String text = "hello";

        // process the text by adding a random string
        eventService.processTextEvent(tabId, text);

        // check the new stored label per tab
        String stored = eventService.getLabel(tabId);

        // since we append a random text, just check if it STARTS with "hello"
        assertTrue(stored.startsWith("hello-"));
    }

    @Test
    void test_NoLabelFound() {
        String result = eventService.getLabel("unknown-tab");

        // service should return no data by default
        assertEquals("no data", result);
    }
}
