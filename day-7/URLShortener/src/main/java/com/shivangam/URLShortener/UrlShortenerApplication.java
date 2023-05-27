package com.shivangam.URLShortener;

import com.shivangam.URLShortener.service.URLShortenerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class UrlShortenerApplication {

	public static void main(String[] args) {
		SpringApplication.run(UrlShortenerApplication.class, args);

		URLShortenerService service = new URLShortenerService();
		System.out.println(service.shortenURL("http://example.com/"));
		System.out.println(service.shortenURL("https://example.com/"));
		System.out.println(service.shortenURL("ftp://example.com/"));

		System.out.println(service.shortenURL("http://www.example.com/"));
		System.out.println(service.shortenURL("https://www.example.com/"));
		System.out.println(service.shortenURL("ftp://www.example.com/"));
	}

}
