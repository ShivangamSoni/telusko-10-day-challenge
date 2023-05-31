package com.shivangam.QuizApp.DTO;

import java.util.List;

public record QuizRequestDTO(String name, Long technology_id, List<Long> question_ids) {
}
