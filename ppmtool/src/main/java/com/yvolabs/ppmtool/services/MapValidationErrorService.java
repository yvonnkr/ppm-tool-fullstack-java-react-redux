package com.yvolabs.ppmtool.services;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.Map;
import java.util.stream.Collectors;

@Service
public class MapValidationErrorService {

    public ResponseEntity<?> mapValidationErrorResult(BindingResult result){
        if(result.hasErrors()){
            Map<String, String> errorMap = result.getFieldErrors()
                    .stream()
                    .collect(Collectors.toMap(e -> e.getField(), e -> e.getDefaultMessage()));

            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }

        return null;
    }
}
