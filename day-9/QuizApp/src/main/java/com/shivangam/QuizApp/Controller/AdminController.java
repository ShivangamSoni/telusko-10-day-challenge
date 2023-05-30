package com.shivangam.QuizApp.Controller;

import com.shivangam.QuizApp.Entity.TechnologyEntity;
import com.shivangam.QuizApp.Service.TechnologyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    public TechnologyService technologyService;

    @PostMapping("/technology")
    public ResponseEntity<TechnologyEntity> createTechnology(@RequestBody TechnologyEntity technology) {
        var createdTechnology = technologyService.createTechnology(technology);
        return new ResponseEntity<>(createdTechnology, HttpStatus.CREATED);
    }

    @PutMapping("/technology/{id}")
    public ResponseEntity<TechnologyEntity> updateTechnology(@PathVariable("id") Long id, @RequestBody TechnologyEntity technology) {
        var updatedTechnology = technologyService.updateTechnology(id, technology);
        return new ResponseEntity<>(updatedTechnology, HttpStatus.OK);
    }

    @DeleteMapping("/technology/{id}")
    public ResponseEntity<Void> deleteTechnology(@PathVariable("id") Long id) {
        technologyService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/technology")
    public ResponseEntity<List<TechnologyEntity>> getAllTechnologies() {
        var technologies = technologyService.getAllTechnologies();
        return new ResponseEntity<>(technologies, HttpStatus.OK);
    }
}
