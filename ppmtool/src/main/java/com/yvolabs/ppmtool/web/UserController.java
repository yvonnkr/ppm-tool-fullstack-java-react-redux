package com.yvolabs.ppmtool.web;

import com.yvolabs.ppmtool.domain.User;
import com.yvolabs.ppmtool.services.MapValidationErrorService;
import com.yvolabs.ppmtool.services.UserService;
import com.yvolabs.ppmtool.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserValidator userValidator;
    private final MapValidationErrorService mapValidationErrorService;
    private final UserService userService;

    @Autowired
    public UserController(UserValidator userValidator, MapValidationErrorService mapValidationErrorService, UserService userService) {
        this.userValidator = userValidator;
        this.mapValidationErrorService = mapValidationErrorService;
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result){
        // validate password
        userValidator.validate(user, result);

        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationErrorResult(result);
        if (errorMap != null) return errorMap;

        User newUser = userService.saveUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);

    }
}
