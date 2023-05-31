package com.shivangam.QuizApp.DTO;

import com.shivangam.QuizApp.Entity.QuestionEntity;

public record QuestionResponseDTO(String message, QuestionEntity question) {
}
