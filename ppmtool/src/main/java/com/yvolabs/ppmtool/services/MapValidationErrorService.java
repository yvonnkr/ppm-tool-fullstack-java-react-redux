package com.yvolabs.ppmtool.services;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.HashMap;
import java.util.Map;

@Service
public class MapValidationErrorService {

    public ResponseEntity<?> mapValidationErrorResult(BindingResult result){
//        if(result.hasErrors()){
//            Map<String, String> errorMap = result.getFieldErrors()
//                    .stream()
//                    .collect(Collectors.toMap(e -> e.getField(), e -> e.getDefaultMessage()));
//
//            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
//        }

        if(result.hasErrors()){
            Map<String, String> errorMap = new HashMap<>();

            result.getFieldErrors()
                    .stream()
                    .forEach(e -> errorMap.put(e.getField(),e.getDefaultMessage()) );

            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }

        return null;
    }
}
