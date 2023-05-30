package com.shivangam.QuizApp.Service;

import com.shivangam.QuizApp.Entity.TechnologyEntity;
import com.shivangam.QuizApp.Repository.TechnologyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TechnologyService {
    @Autowired
    public TechnologyRepository repo;

    public TechnologyEntity createTechnology(TechnologyEntity technology) {
        return repo.save(technology);
    }

    public void deleteById(Long id) {
        repo.deleteById(id);
    }

    public TechnologyEntity updateTechnology(Long id, TechnologyEntity technology) {
        technology.setId(id);
        return repo.save(technology);
    }

    public List<TechnologyEntity> getAllTechnologies() {
        return repo.findAll();
    }
}
