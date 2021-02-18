package com.yvolabs.ppmtool.services;

import com.yvolabs.ppmtool.domain.User;
import com.yvolabs.ppmtool.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public User saveUser (User newUser){
        String encodedPassword = bCryptPasswordEncoder.encode(newUser.getPassword());
        newUser.setPassword(encodedPassword);

        // todo: Username has to be unique (exception)

        // todo: Make sure that password and confirmPassword match
        // todo: We don't persist or show the confirmPassword
        return userRepository.save(newUser);
    }
}
