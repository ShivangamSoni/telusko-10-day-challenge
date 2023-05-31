package com.shivangam.QuizApp.DTO;

import com.shivangam.QuizApp.Entity.QuizEntity;

public record QuizAdminResponseDTO (String message, QuizEntity quiz){
}
