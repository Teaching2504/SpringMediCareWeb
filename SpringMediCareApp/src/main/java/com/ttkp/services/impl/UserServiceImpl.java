package com.ttkp.services.impl;

import com.ttkp.pojo.User;
import com.ttkp.repositories.UserRepository;
import com.ttkp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User login(String username, String password) {
        return this.userRepository.login(username, password);
    }

    @Override
    public boolean existsUsername(String username) {
        return this.userRepository.existsUsername(username);
    }

    @Override
    public boolean existsEmail(String email) {
        return this.userRepository.existsEmail(email);
    }

    @Override
    public boolean registerPatient(String firstName, String lastName, String email,
            String phone, String username, String password,
            String dateOfBirth, String gender, String address) {
        return this.userRepository.registerPatient(
                firstName, lastName, email, phone, username,
                password, dateOfBirth, gender, address);
    }
}