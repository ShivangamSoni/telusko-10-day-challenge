package com.shivangam.QuizApp.Controller;

import com.shivangam.QuizApp.DTO.*;
import com.shivangam.QuizApp.Entity.QuestionEntity;
import com.shivangam.QuizApp.Entity.QuizEntity;
import com.shivangam.QuizApp.Entity.TechnologyEntity;
import com.shivangam.QuizApp.Service.QuizService;
import com.shivangam.QuizApp.Service.TechnologyService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Controller
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    public TechnologyService technologyService;
    @Autowired
    public QuizService quizService;

    @GetMapping("/technology")
    public ResponseEntity<List<TechnologyEntity>> getAllTechnologies() {
        var technologies = technologyService.getAllTechnologies();
        return new ResponseEntity<>(technologies, HttpStatus.OK);
    }

    @GetMapping("/quiz")
    public ResponseEntity<List<QuizUserResponseDTO>> getAllQuizzes(@RequestParam(required = false) Long technologyId) {
        List<QuizEntity> quizzes;
        if(technologyId != null) {
            quizzes = quizService.getAllQuizByTechnologyId(technologyId);
        } else {
            quizzes = quizService.getAllQuiz();
        }
        var quizData = quizzes
                                            .stream()
                                            .map(quiz -> new QuizUserResponseDTO(quiz.getId(), quiz.getName(), quiz.getTechnology(), (long) quiz.getQuestions().size()))
                                            .toList();
        return new ResponseEntity<>(quizData, HttpStatus.OK);
    }

    @PostMapping("/quiz/{id}/start")
    public ResponseEntity<QuestionUserResponseDTO> startQuiz(@PathVariable("id") Long id, HttpSession session) {
        var quiz = quizService.getById(id);
        if(quiz == null) {
            return new ResponseEntity<>(new QuestionUserResponseDTO("Quiz with given ID Not Found", null, null, null), HttpStatus.NOT_FOUND);
        }

        if(session.getAttribute("currentQuiz") != null) {
            QuizEntity currentQuiz = (QuizEntity) session.getAttribute("currentQuiz");
            return new ResponseEntity<>(new QuestionUserResponseDTO("Quiz with ID:" + currentQuiz.getId() + " is already in Progress", null, null, null), HttpStatus.CONFLICT);
        }

        int currentIndex = 0;

        session.setAttribute("currentQuiz", quiz);
        session.setAttribute("currentIndex", currentIndex);

        var question = quiz.getQuestions().get(currentIndex);
        var questionData = new QuestionUserDTO(question.getId(), question.getQuestion(), question.getOption1(), question.getOption2(), question.getOption3(), question.getOption4(), (long) currentIndex, (long) quiz.getQuestions().size());
        var questionResponse = new QuestionUserResponseDTO("Quiz Started", false, questionData, null);
        return new ResponseEntity<>(questionResponse, HttpStatus.OK);
    }

    @PostMapping("/quiz/{id}/submit")
    public ResponseEntity<QuestionUserResponseDTO> submitAnswerAndContinue(@PathVariable("id") Long id, @RequestBody AnswerRequestDTO answerRequest, HttpSession session) {
        QuizEntity currentQuiz = (QuizEntity) session.getAttribute("currentQuiz");
        Integer currentIndex = (Integer) session.getAttribute("currentIndex");
        if(currentQuiz == null || currentIndex == null) {
            return new ResponseEntity<>(new QuestionUserResponseDTO("You need to Start the Quiz before Submitting Answers", null, null, null), HttpStatus.NOT_ACCEPTABLE);
        }

        if(!Objects.equals(id, currentQuiz.getId())) {
            return new ResponseEntity<>(new QuestionUserResponseDTO("Quiz with ID:" + currentQuiz.getId() + " is already in Progress", null, null, null), HttpStatus.CONFLICT);
        }

        QuestionEntity currentQuestion = currentQuiz.getQuestions().get(currentIndex);
        if(currentQuestion.getId() != answerRequest.questionId()) {
            return new ResponseEntity<>(new QuestionUserResponseDTO("Answer ID Incorrect, Quiz must be submitted in Sequence", null, null, null), HttpStatus.CONFLICT);
        }

        var answers = (List<AnswerRequestDTO>) session.getAttribute("answers");
        if(answers == null) {
            answers = new ArrayList<>();
        }

        answers.add(answerRequest);
        session.setAttribute("answers", answers);

        if(currentIndex == currentQuiz.getQuestions().size() - 1) {
            var score = calculateScore(currentQuiz, answers);
            session.removeAttribute("currentQuiz");
            session.removeAttribute("currentIndex");
            session.removeAttribute("answers");
            return new ResponseEntity<>(new QuestionUserResponseDTO("Quiz Ended", true, null, score), HttpStatus.OK);
        }

        currentIndex++;
        session.setAttribute("currentIndex", currentIndex);
        var question = currentQuiz.getQuestions().get(currentIndex);
        var questionData = new QuestionUserDTO(question.getId(), question.getQuestion(), question.getOption1(), question.getOption2(), question.getOption3(), question.getOption4(), (long) currentIndex, (long) currentQuiz.getQuestions().size());
        var questionResponse = new QuestionUserResponseDTO("Next Question", false, questionData, null);
        return new ResponseEntity<>(questionResponse, HttpStatus.OK);
    }

    private ScoreDTO calculateScore(QuizEntity quiz, List<AnswerRequestDTO> answers) {
        Long totalQuestions = (long) quiz.getQuestions().size();
        Long correctAnswers = answers.stream()
                .filter(answer -> isAnswerCorrect(answer, quiz))
                .count();
        Long incorrectAnswers = totalQuestions - correctAnswers;

        return new ScoreDTO(totalQuestions, correctAnswers, incorrectAnswers);
    }

    private boolean isAnswerCorrect(AnswerRequestDTO answer, QuizEntity quiz) {
        Optional<QuestionEntity> optionalQuestion = quiz.getQuestions()
                                                        .stream()
                                                        .filter(question -> question.getId() == answer.questionId())
                                                        .findFirst();

        if(optionalQuestion.isPresent()) {
            QuestionEntity question = optionalQuestion.get();
            return question.getAnswer().equalsIgnoreCase(answer.answer());
        }

        return false;
    }
}
