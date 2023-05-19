package com.restropos.Controller;

import com.restropos.models.Role;
import com.restropos.models.User;
import com.restropos.models.UserRole;
import com.restropos.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

//    For creating user
    @PostMapping("/")
    public User createUser(@RequestBody User user) throws Exception {

        Set<UserRole> roles=new HashSet<>();

        Role role= new Role();
        role.setRoleId(1L);
        role.setRoleName("ADMIN");

        UserRole userRole= new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);

        roles.add(userRole);

          return this.userService.createUser(user,roles);
    }

//get user by username
    @GetMapping("/{username}")
    public User getUser(@PathVariable("username") String username){
      return this.userService.getUser(username);
    }

//    Delete user by id
    @DeleteMapping("/{userId}")
   public void deleteUser(@PathVariable("userId") Long userId){
        this.userService.deletUser(userId);
    }


//    Update API





//    @ExceptionHandler(UserNotFoundException.class)
//    public ResponseEntity<?> exceptionHandler(UserNotFoundException ex){
//        return ResponseEntity;
//    }


}
