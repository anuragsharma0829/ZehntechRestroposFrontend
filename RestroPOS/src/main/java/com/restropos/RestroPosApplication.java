package com.restropos;

import com.restropos.models.Role;
import com.restropos.models.User;
import com.restropos.models.UserRole;
import com.restropos.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class RestroPosApplication implements CommandLineRunner {

    @Autowired
    private UserService userService;

    public static void main(String[] args) {
        SpringApplication.run(RestroPosApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Starting code..");



//      Role role1 =new Role();
//      role1.setRoleId(44L);
//      role1.setRoleName("ADMIN");
//
//      Set<UserRole> userRoleSet= new HashSet<>();
//      UserRole userRole=new UserRole();
//      userRole.setRole(role1);
//      userRole.setUser(user);
//
//      userRoleSet.add(userRole);
//
//    User user1=  this.userService.createUser(user,userRoleSet);
//        System.out.println(user1.getUsername());

    }
}
