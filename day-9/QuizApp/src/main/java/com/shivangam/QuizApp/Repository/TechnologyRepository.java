package com.shivangam.QuizApp.Repository;

import com.shivangam.QuizApp.Entity.TechnologyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TechnologyRepository extends JpaRepository<TechnologyEntity, Long> {
}
