package com.example.CURD_students.repository;


import com.example.CURD_students.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    List<Student> findByDeletedFalse();
    Optional<Student> findByIdAndDeletedFalse(long id);

}
