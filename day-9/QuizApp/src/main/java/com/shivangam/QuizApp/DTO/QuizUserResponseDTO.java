package com.shivangam.QuizApp.DTO;

import com.shivangam.QuizApp.Entity.TechnologyEntity;

public record QuizUserResponseDTO(Long id, String name, TechnologyEntity technology, Long numberOfQuestions) {
}
