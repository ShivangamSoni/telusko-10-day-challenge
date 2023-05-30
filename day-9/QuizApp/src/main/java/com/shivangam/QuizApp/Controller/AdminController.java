package com.shivangam.QuizApp.Controller;

import com.shivangam.QuizApp.DTO.QuestionRequestDTO;
import com.shivangam.QuizApp.DTO.QuestionResponseDTO;
import com.shivangam.QuizApp.Entity.QuestionEntity;
import com.shivangam.QuizApp.Entity.TechnologyEntity;
import com.shivangam.QuizApp.Service.QuestionService;
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
    @Autowired
    public QuestionService questionService;

    // Technology Endpoints
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

    // Question Endpoints
    @PostMapping("/question")
    public ResponseEntity<QuestionResponseDTO> createQuestion(@RequestBody QuestionRequestDTO questionRequest) {
        var question = new QuestionEntity();
        question.setQuestion(questionRequest.question());
        question.setAnswer(questionRequest.answer());
        question.setOption1(questionRequest.option1());
        question.setOption2(questionRequest.option2());
        question.setOption3(questionRequest.option3());
        question.setOption4(questionRequest.option4());

        TechnologyEntity technology = technologyService.getById(questionRequest.technology_id());
        if(technology == null) {
            return new ResponseEntity<>(new QuestionResponseDTO("Technology with given ID Not Found", null), HttpStatus.NOT_FOUND);
        }
        question.setTechnology(technology);

        var createdQuestion =  questionService.createQuestion(question);
        return new ResponseEntity<>(new QuestionResponseDTO("Question Created", createdQuestion), HttpStatus.CREATED);
    }

    @PutMapping("/question/{id}")
    public ResponseEntity<QuestionResponseDTO> updateQuestion(@PathVariable("id") Long id, @RequestBody QuestionRequestDTO questionRequest) {
        var question = new QuestionEntity();
        question.setQuestion(questionRequest.question());
        question.setAnswer(questionRequest.answer());
        question.setOption1(questionRequest.option1());
        question.setOption2(questionRequest.option2());
        question.setOption3(questionRequest.option3());
        question.setOption4(questionRequest.option4());

        TechnologyEntity technology = technologyService.getById(questionRequest.technology_id());
        if(technology == null) {
            return new ResponseEntity<>(new QuestionResponseDTO("Technology with given ID Not Found", null), HttpStatus.NOT_FOUND);
        }
        question.setTechnology(technology);

        var updatedQuestion = questionService.updateQuestion(id, question);
        return new ResponseEntity<>(new QuestionResponseDTO("Question Updated", updatedQuestion), HttpStatus.OK);
    }

    @DeleteMapping("/question/{id}")
    public ResponseEntity<QuestionResponseDTO> deleteQuestion(@PathVariable("id") Long id){
        questionService.deleteById(id);
        return new ResponseEntity<>(new QuestionResponseDTO("Question Deleted", null), HttpStatus.OK);
    }

    @GetMapping("/question")
    public ResponseEntity<List<QuestionEntity>> getAllQuestions(@RequestParam(required = false) Long technologyId) {
        List<QuestionEntity> questions;
        if(technologyId != null) {
            questions = questionService.getAllQuestionsByTechnologyId(technologyId);
        } else {
            questions = questionService.getAllQuestions();
        }
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @GetMapping("/question/{id}")
    public ResponseEntity<QuestionEntity> getQuestion(@PathVariable("id") Long id) {
        QuestionEntity ques = questionService.getQuestionById(id);
        return new ResponseEntity<>(ques, HttpStatus.OK);
    }
}
