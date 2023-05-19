package com.restropos.service.impl;

import com.restropos.models.User;
import com.restropos.models.UserRole;
import com.restropos.repo.RoleRepository;
import com.restropos.repo.UserRepository;
import com.restropos.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

//Creating user
    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception {

     User local=   this.userRepository.findByUsername(user.getUsername());
       if(local!=null){
           System.out.println("User is already there");
           throw new Exception("User already present");
       }
       else {
//           Create User
//first we have to save role
           for(UserRole ur:userRoles){
               roleRepository.save(ur.getRole());
           }

           user.getUserRoles().addAll(userRoles);
           local=  this.userRepository.save(user);

       }
        return local;
    }


//
    //    Get User by username
    @Override
    public User getUser(String username) {
        return this.userRepository.findByUsername(username);
    }


//    Delet User
    @Override
    public void deletUser(Long userId) {
   this.userRepository.deleteById(userId);
    }


}
