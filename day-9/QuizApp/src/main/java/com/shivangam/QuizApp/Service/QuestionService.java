package com.shivangam.QuizApp.Service;

import com.shivangam.QuizApp.Entity.QuestionEntity;
import com.shivangam.QuizApp.Repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {
    @Autowired
    public QuestionRepository repo;

    public QuestionEntity createQuestion(QuestionEntity question) {
        return repo.save(question);
    }

    public void deleteById(Long id) {
        repo.deleteById(id);
    }

    public QuestionEntity updateQuestion(Long id, QuestionEntity question) {
        question.setId(id);
        return repo.save(question);
    }

    public List<QuestionEntity> getAllQuestions() {
        return repo.findAll();
    }

    public List<QuestionEntity> getAllQuestionsByTechnologyId(Long technologyId) {
        return repo.findAllQuestionByTechnologyId(technologyId);
    }

    public List<QuestionEntity> getAllQuestionsById(List<Long> ids) {
        return repo.findAllById(ids);
    }

    public QuestionEntity getQuestionById(Long id) {
        return repo.findById(id).orElse(null);
    }
}
