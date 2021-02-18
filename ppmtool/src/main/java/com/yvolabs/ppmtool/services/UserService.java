package com.yvolabs.ppmtool.services;

import com.yvolabs.ppmtool.domain.User;
import com.yvolabs.ppmtool.exceptions.UsernameAlreadyExistsException;
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

    public User saveUser(User newUser) {
        try {

            String encodedPassword = bCryptPasswordEncoder.encode(newUser.getPassword());

            newUser.setPassword(encodedPassword);

            newUser.setUsername(newUser.getUsername()); // if not unique will throw ex

            newUser.setConfirmPassword(""); // We don't persist or show the confirmPassword in response

            return userRepository.save(newUser);

        } catch (Exception e) {

            throw new UsernameAlreadyExistsException("Username " + newUser.getUsername() + " already exists");
        }
    }
}
