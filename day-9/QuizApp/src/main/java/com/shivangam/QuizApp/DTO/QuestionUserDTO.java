package com.shivangam.QuizApp.DTO;

public record QuestionUserDTO(Long id, String question, String option1, String option2, String option3, String option4, Long questionNumber, Long totalQuestions) {
}
