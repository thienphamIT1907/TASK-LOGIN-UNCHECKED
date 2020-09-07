package com.login.config;

import com.login.models.Role;
import com.login.models.User;
import com.login.models.constant.ERoleName;
import com.login.repositories.RoleRepository;
import com.login.repositories.UserRepository;
import com.login.security.jwt.JwtEntryPoint;
import com.login.security.jwt.JwtFilter;
import com.login.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.HashSet;
import java.util.Set;

@Configuration
@EnableWebMvc
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Value("${app.admin.username}")
    private String adminUsername;

    @Value("${app.admin.password}")
    private String adminPassword;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private JwtEntryPoint jwtEntryPoint;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public JwtFilter authenticationFilter() {
        return new JwtFilter();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    ApplicationRunner init(RoleRepository roleRepository, UserRepository userRepository) {
        return args -> {
            if (roleRepository.findAll().size() == 0) {

                Role adminRole = new Role(ERoleName.ROLE_ADMIN);
                adminRole.setId(1);

                Role memberRole = new Role(ERoleName.ROLE_MEMBER);
                memberRole.setId(2);

                roleRepository.save(adminRole);
                roleRepository.save(memberRole);

                Set<Role> roles = new HashSet<>();
                roles.add(roleRepository.findByRoleName(ERoleName.ROLE_ADMIN).orElseThrow(
                    () -> new RuntimeException("Role doesn't exist")
                ));

                for (Role role: roles) {
                    System.out.println(role.getRoleName());
                }

                // PRIMARY ADMIN
                User admin = new User(
                    adminUsername,
                    passwordEncoder.encode(adminPassword),
                    "ADMIN",
                    "admin@gmail.com",
                    "Da Nang",
                    "0123456799",
                    null,
                    roles
                );
                userRepository.save(admin);

                // SECONDARY ADMIN
                User admin_2 = new User(
                        "thienpa",
                        passwordEncoder.encode("123123"),
                        "Thien",
                        "thien@gmail.com",
                        "Da Nang",
                        "0998283831",
                        null,
                        roles
                );
                userRepository.save(admin_2);

                Set<Role> rolesForMember = new HashSet<>();
                rolesForMember.add(roleRepository.findByRoleName(ERoleName.ROLE_MEMBER).orElseThrow(
                        () -> new RuntimeException("Role doesn't exist")
                ));

                User member = new User(
                        "membertest",
                        passwordEncoder.encode("123123"),
                        "MEMBER",
                        "member@gmail.com",
                        "Da Nang",
                        "0998283831",
                        null,
                        rolesForMember
                );
                userRepository.save(member);
            }
        };
    }

    @Override
    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder
            .userDetailsService(userDetailsService)
            .passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .cors().and().csrf().disable()
            .authorizeRequests()
            .antMatchers("/api/auth/**", "/api/test/**").permitAll()
            .and()
            .exceptionHandling().authenticationEntryPoint(jwtEntryPoint)
            .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http
            .addFilterBefore(
                authenticationFilter(),
                UsernamePasswordAuthenticationFilter.class
            );
    }
}
