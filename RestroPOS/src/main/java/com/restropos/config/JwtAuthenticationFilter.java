package com.restropos.config;

import com.restropos.service.impl.UserDetailServiceImpl;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private UserDetailServiceImpl userDetailService;

    @Autowired
     private Jwtutils jwtutils;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {


     final String requestTokenHeader= request.getHeader("Authorization");

        System.out.println(requestTokenHeader);
        String username=null;
        String jwtToken=null;

        if(requestTokenHeader!=null && requestTokenHeader.startsWith("Bearer"  ))
        {
//            yes
            jwtToken=requestTokenHeader.substring(7);

            try{
                username = jwtutils.getUsernameFromToken(jwtToken);
            }catch(ExpiredJwtException e){
                e.printStackTrace();
                System.out.println("Jwt Token has expired");
        }catch(Exception e){
                e.printStackTrace();
                System.out.println("error");
            }


        }else
        {
            System.out.println("Invalid Token, Not start With Bearer");
        }

                // validate Token
        if(null != username && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails
                    = userDetailService.loadUserByUsername(username);

            if(jwtutils.validateToken(jwtToken,userDetails)) {
//                token valid
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
                        = new UsernamePasswordAuthenticationToken(userDetails,
                        null, userDetails.getAuthorities());

                usernamePasswordAuthenticationToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }

        }else {
            System.out.println("Token Is Not Valid");
        }

        filterChain.doFilter(request, response);
    }
}
