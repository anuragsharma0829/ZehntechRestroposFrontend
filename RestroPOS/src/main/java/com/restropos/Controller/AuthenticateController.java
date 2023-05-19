package com.restropos.Controller;

import com.restropos.config.Jwtutils;
import com.restropos.models.JwtRequest;
import com.restropos.models.JwtResponse;
import com.restropos.service.impl.UserDetailServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class AuthenticateController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailServiceImpl userDetailService;
    @Autowired
    private Jwtutils jwtutils;



//    Generate Token
    @PostMapping("/generate-token")
    public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        try{

            authenticate(jwtRequest.getUsername(),jwtRequest.getPassword());

        }catch(UsernameNotFoundException e){
    e.printStackTrace();
    throw new Exception("User Not Found");
        }

      //////////Authentication
        UserDetails userDetails= this.userDetailService.loadUserByUsername(jwtRequest.getUsername());
        String token = this.jwtutils.generateToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(token));
    }







    private void authenticate(String username,String password) throws Exception {
              try{

                  authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username,password));

              }catch(DisabledException e){
                  throw new Exception("User Disabled");
              }catch(BadCredentialsException e)
              {
                  throw new Exception("Invalid Credentials");
              }
    }

}
