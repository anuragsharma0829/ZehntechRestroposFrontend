package net.javaguides.springboot.payload;
import lombok.Data;

@Data
public class SignUpDto {
    private String name;
    private String username;
    private String email;
    private String password;
    private String phone;
    private String about;
    private String profile;
}