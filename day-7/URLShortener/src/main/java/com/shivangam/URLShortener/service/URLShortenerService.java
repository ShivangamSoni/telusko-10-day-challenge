package com.shivangam.URLShortener.service;

import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Random;

@Service
public class URLShortenerService {
    private Random random;
    private static final int SHORT_URL_LENGTH = 6;

    public URLShortenerService() {
        random = new Random();
    }

    public String shortenURL(String originalURL) {
        String originalURLWithoutProtocol = removeProtocol(originalURL);
        return "shi.vi/" + generateUniquePart(originalURLWithoutProtocol);
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
            return urlString.replace(protocol + "://", "");
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        return urlString;
    }
}
