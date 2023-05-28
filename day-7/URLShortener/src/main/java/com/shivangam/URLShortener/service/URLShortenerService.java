package com.shivangam.URLShortener.service;

import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Service
public class URLShortenerService {
    private final Map<String, String> cache;
    private static final int SHORT_URL_LENGTH = 6;

    public URLShortenerService() {
        cache = new HashMap<>();
    }

    public String expandURL(String shortURL) {
        String urlWithoutProtocol = removeProtocol(shortURL);
        for(Map.Entry<String, String> entry: cache.entrySet()) {
            if(entry.getValue().equals(urlWithoutProtocol)) {
                return entry.getKey();
            }
        }
        return "URL Not Found";
    }

    public String shortenURL(String originalURL) {
        if(cache.containsKey(originalURL)) {
            return "https://" + cache.get(originalURL);
        }

        String originalURLWithoutProtocol = removeProtocol(originalURL);
        String shortenedURL =  "shi.vi/" + generateUniquePart(originalURLWithoutProtocol);
        cache.put(originalURL, shortenedURL);
        return "https://" + shortenedURL;
    }

    private String generateUniquePart(String originalURL) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(originalURL.getBytes(StandardCharsets.UTF_8));
            String hash = Base64.getUrlEncoder().withoutPadding().encodeToString(hashBytes);
            return hash.substring(0, SHORT_URL_LENGTH);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to generate URL");
        }
    }

    private String removeProtocol(String urlString) {
        try {
            URL url = new URL(urlString);
            String protocol = url.getProtocol();
            String noProtocolURL = urlString.replace(protocol + "://", "");
            if(noProtocolURL.endsWith("/")) {
                noProtocolURL = noProtocolURL.substring(0, noProtocolURL.length() - 1);
            }
            return noProtocolURL;
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        return urlString;
    }
}
