package com.shivangam.QuizApp.Controller;

import com.shivangam.QuizApp.Entity.TechnologyEntity;
import com.shivangam.QuizApp.Service.TechnologyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    public TechnologyService technologyService;

    @GetMapping("/technology")
    public ResponseEntity<List<TechnologyEntity>> getAllTechnologies() {
        var technologies = technologyService.getAllTechnologies();
        return new ResponseEntity<>(technologies, HttpStatus.OK);
    }
}
