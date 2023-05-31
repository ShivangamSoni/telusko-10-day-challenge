package com.shivangam.QuizApp.Entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "quiz")
public class QuizEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @ManyToOne
    @JoinColumn(name = "technology_id")
    private TechnologyEntity technology;

    @ManyToMany
    @JoinTable(name = "quiz__question", joinColumns = @JoinColumn(name = "quiz_id"), inverseJoinColumns = @JoinColumn(name = "question_id"))
    private List<QuestionEntity> questions;

    public QuizEntity() {
    }

    public QuizEntity(Long id, String name, TechnologyEntity technology, List<QuestionEntity> questions) {
        this.id = id;
        this.name = name;
        this.technology = technology;
        this.questions = questions;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public TechnologyEntity getTechnology() {
        return technology;
    }

    public void setTechnology(TechnologyEntity technology) {
        this.technology = technology;
    }

    public List<QuestionEntity> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuestionEntity> questions) {
        this.questions = questions;
    }
}
