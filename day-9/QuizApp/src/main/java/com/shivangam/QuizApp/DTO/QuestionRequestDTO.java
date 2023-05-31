package com.shivangam.QuizApp.DTO;

public record QuestionRequestDTO(String question, String option1, String option2, String option3, String option4, String answer, Long technology_id) {
}
