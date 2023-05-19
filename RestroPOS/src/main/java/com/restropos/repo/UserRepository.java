package com.restropos.repo;

import com.restropos.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
public User findByUsername(String usename);
}
