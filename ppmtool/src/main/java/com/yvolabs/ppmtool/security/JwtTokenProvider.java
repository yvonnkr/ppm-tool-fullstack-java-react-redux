package com.yvolabs.ppmtool.security;

import com.yvolabs.ppmtool.domain.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.yvolabs.ppmtool.security.SecurityConstants.EXPIRATION_TIME;
import static com.yvolabs.ppmtool.security.SecurityConstants.SECRET;

@Component
public class JwtTokenProvider {

    // Generate the token
    public String generateToken(Authentication authentication){
        User user = (User) authentication.getPrincipal();
        Date now = new Date(System.currentTimeMillis());
        Date expiryDate = new Date(now.getTime()+EXPIRATION_TIME);
        String userId = Long.toString(user.getId());

        Map<String,Object> claims = new HashMap<>();
        claims.put("id", (Long.toString(user.getId())));
        claims.put("username", user.getUsername());
        claims.put("fullName", user.getFullName());

        SecretKey secretKey = Keys.hmacShaKeyFor(SECRET.getBytes());

        return Jwts.builder()
                .setSubject(userId)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(secretKey, SignatureAlgorithm.HS512)
                .compact();
//                .signWith(SignatureAlgorithm.HS512, SECRET) //deprecated

    }

    // Validated the token
    // Get user id from the token
}
