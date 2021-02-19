package com.yvolabs.ppmtool.web;

import com.yvolabs.ppmtool.domain.User;
import com.yvolabs.ppmtool.payload.JWTLoginSucessReponse;
import com.yvolabs.ppmtool.payload.LoginRequest;
import com.yvolabs.ppmtool.security.JwtTokenProvider;
import com.yvolabs.ppmtool.services.MapValidationErrorService;
import com.yvolabs.ppmtool.services.UserService;
import com.yvolabs.ppmtool.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import static com.yvolabs.ppmtool.security.SecurityConstants.TOKEN_PREFIX;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserValidator userValidator;
    private final MapValidationErrorService mapValidationErrorService;
    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public UserController(UserValidator userValidator, MapValidationErrorService mapValidationErrorService, UserService userService, JwtTokenProvider jwtTokenProvider, AuthenticationManager authenticationManager) {
        this.userValidator = userValidator;
        this.mapValidationErrorService = mapValidationErrorService;
        this.userService = userService;
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result){
        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationErrorResult(result);
        if (errorMap != null) return errorMap;

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX +  jwtTokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JWTLoginSucessReponse(true, jwt));
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
