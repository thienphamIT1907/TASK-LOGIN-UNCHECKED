package com.login.security.jwt;

import com.login.models.UserPrincipal;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtProvider {

    private static final Logger logger = LoggerFactory.getLogger(JwtProvider.class);

    @Value("${app.login.jwtSecretKey}")
    private String JWT_SECRET_KEY;

    @Value("${app.login.jwtExpiration}")
    private int JWT_EXPIRATION;

    public String generatingJwt(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Date currentDate = new Date();
        Date expiryDate = new Date(currentDate.getTime() + JWT_EXPIRATION * 1000);
        return Jwts
                .builder()
                .setSubject(userPrincipal.getUsername())
                .signWith(SignatureAlgorithm.HS512, JWT_SECRET_KEY)
                .setExpiration(expiryDate)
                .setIssuedAt(currentDate)
                .compact();
    }

    public boolean validatingJwt(String token) {
        try {
            Jwts
                    .parser()
                    .setSigningKey(JWT_SECRET_KEY)
                    .parseClaimsJws(token);

            return true;

        } catch (SignatureException ex) {
            logger.error("Invalid JWT signature", ex);
        } catch (MalformedJwtException ex) {
            logger.error("Invalid JWT", ex);
        } catch (ExpiredJwtException ex) {
            logger.error("Expired JWT", ex);
        } catch (UnsupportedJwtException ex) {
            logger.error("Unsupported JWT", ex);
        } catch (IllegalArgumentException ex) {
            logger.error(" JWT is empty", ex);
        }
        return false;
    }

    public String getUsernameFromToken(String token) {
        return Jwts
                .parser()
                .setSigningKey(JWT_SECRET_KEY)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
