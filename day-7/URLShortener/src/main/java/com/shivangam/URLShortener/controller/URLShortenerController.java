package com.shivangam.URLShortener.controller;

import com.shivangam.URLShortener.service.URLShortenerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class URLShortenerController {
    @Autowired
    private URLShortenerService urlService;

    @PostMapping("/shorten")
    public String shortenURL(@RequestBody String originalURL) {
        return urlService.shortenURL(originalURL);
    }

    @PostMapping("/expand")
    public String expandURL(@RequestBody String shortURL) {
        return urlService.expandURL(shortURL);
    }
}
