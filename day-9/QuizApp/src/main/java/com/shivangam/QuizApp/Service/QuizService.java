package com.shivangam.QuizApp.Service;

import com.shivangam.QuizApp.Entity.QuizEntity;
import com.shivangam.QuizApp.Repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizService {
    @Autowired
    public QuizRepository repo;

    public QuizEntity createQuiz(QuizEntity quiz) {
        return repo.save(quiz);
    }

    public void deleteById(Long id) {
        repo.deleteById(id);
    }

    public QuizEntity updateQuiz(Long id, QuizEntity quiz) {
        quiz.setId(id);
        return repo.save(quiz);
    }

    public List<QuizEntity> getAllQuiz() {
        return repo.findAll();
    }

    public List<QuizEntity> getAllQuizByTechnologyId(Long technologyId) {
        return repo.findAllQuizByTechnologyId(technologyId);
    };

    public QuizEntity getById(Long id) {
        return repo.findById(id).orElse(null);
    }
}
