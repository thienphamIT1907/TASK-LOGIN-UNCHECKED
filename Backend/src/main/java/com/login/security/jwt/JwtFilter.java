package com.login.security.jwt;

import com.login.models.UserPrincipal;
import com.login.services.UserDetailsServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);

    @Value("${app.login.jwtPrefix}")
    private String PREFIX_TOKEN;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private UserDetailsServiceImpl userDetailServiceImpl;

    private String getJwtFromRequest(HttpServletRequest request) {
        String headerRequest = request.getHeader("Authorization");
        if(headerRequest != null && headerRequest.startsWith("Bearer ")) {
            System.out.println("Exact JWT");
            System.out.println("Prefix header: " + PREFIX_TOKEN);
            return headerRequest.replace("Bearer ", "");
        }
        System.out.println("Wrong JWT");
        return null;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String token = getJwtFromRequest(request);
            System.out.println("Token: " + token);
            if(token != null && jwtProvider.validatingJwt(token)) {
                String username = jwtProvider.getUsernameFromToken(token);
                System.out.println("Username: " + username);
                UserPrincipal userPrincipal = userDetailServiceImpl.loadUserByUsername(username);

                // Create AuthenticationToken
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    userPrincipal,
                    null,
                    userPrincipal.getAuthorities()
                );
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Stored AuthenticationToken in SecurityContext
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        } catch (Exception ex) {
            logger.error("Cannot setting user authentication", ex);
        }
        filterChain.doFilter(request, response);
    }
}
