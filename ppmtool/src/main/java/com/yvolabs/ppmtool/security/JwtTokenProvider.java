package com.yvolabs.ppmtool.security;

import com.yvolabs.ppmtool.domain.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
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
    private SecretKey secretKey = Keys.hmacShaKeyFor(SECRET.getBytes());

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

//        SecretKey secretKey = Keys.hmacShaKeyFor(SECRET.getBytes());

        return Jwts.builder()
                .setSubject(userId)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
//                .signWith(secretKey, SignatureAlgorithm.HS512)
                .signWith(secretKey)
                .compact();
//                .signWith(SignatureAlgorithm.HS512, SECRET) //deprecated

    }

    // Validated the token
    public boolean validateToken(String token){

        try{
//            Jwts.parserBuilder().setSigningKey(SECRET).build().parseClaimsJws(token);
            Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);
            return true;
        }catch (SignatureException ex){
            System.out.println("Invalid JWT Signature");
        }catch (MalformedJwtException ex){
            System.out.println("Invalid JWT Token");
        }catch (ExpiredJwtException ex){
            System.out.println("Expired JWT token");
        }catch (UnsupportedJwtException ex){
            System.out.println("Unsupported JWT token");
        }catch (IllegalArgumentException ex){
            System.out.println("JWT claims string is empty");
        }
        return false;
    }

    // Get user id from the token
    public Long getUserIdFromJWT(String token){
//        Claims claims = Jwts.parserBuilder().setSigningKey(SECRET).build().parseClaimsJws(token).getBody();
        Claims claims = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody();
        String id = (String)claims.get("id");

        return Long.parseLong(id);
    }
}
