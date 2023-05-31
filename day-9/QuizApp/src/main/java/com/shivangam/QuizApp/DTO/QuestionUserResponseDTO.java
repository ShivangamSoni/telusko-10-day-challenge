package com.shivangam.QuizApp.DTO;

public record QuestionUserResponseDTO(String message, Boolean finished, QuestionUserDTO question, ScoreDTO score){
}
