package com.ttkp.controllers;

import com.ttkp.pojo.User;
import com.ttkp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ApiUserController {

    @Autowired
    private UserService userService;

    @PostMapping(value = "/login", consumes = "application/json")
    public ResponseEntity<?> login(@RequestBody User u) {

        User user = this.userService.login(
                u.getUsername(),
                u.getPassword()
        );

        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        }

        return new ResponseEntity<>(
                "Sai thông tin đăng nhập",
                HttpStatus.UNAUTHORIZED
        );
    }

    @PostMapping(value = "/register", consumes = "application/json")
    public ResponseEntity<?> register(@RequestBody Map<String, String> params) {

        boolean result = this.userService.registerPatient(
                params.get("firstName"),
                params.get("lastName"),
                params.get("email"),
                params.get("phone"),
                params.get("username"),
                params.get("password"),
                params.get("dateOfBirth"),
                params.get("gender"),
                params.get("address")
        );

        if (result) {
            return new ResponseEntity<>("Đăng ký thành công", HttpStatus.CREATED);
        }

        return new ResponseEntity<>("Đăng ký thất bại", HttpStatus.BAD_REQUEST);
    }
}
