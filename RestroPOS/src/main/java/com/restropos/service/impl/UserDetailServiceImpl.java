package com.restropos.service.impl;

import com.restropos.models.User;
import com.restropos.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

       User user= this.userRepository.findByUsername(username);
       if(user==null)
       {
           System.out.println("User Not Found");
           throw new UsernameNotFoundException("User not Found !!!!");
       }

           return user;
    }
}
