package com.restropos.service;

import com.restropos.models.User;
import com.restropos.models.UserRole;
import org.springframework.stereotype.Service;

import java.util.Set;


public interface UserService {

//    Creating User
    public User createUser(User user, Set<UserRole> userRoles) throws Exception;

//    login


//    get user by username
    public User getUser(String username);

//    Delete User
    public void deletUser(Long userId);

}
