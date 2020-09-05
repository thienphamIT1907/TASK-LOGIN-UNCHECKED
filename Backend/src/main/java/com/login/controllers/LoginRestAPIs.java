package com.login.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/default")
public class LoginRestAPIs {

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminAccess() {
        return "This page only for admin !";
    }


    @GetMapping("/member")
    @PreAuthorize("hasRole('MEMBER')")
    public String memberAccess() {
        return "This page only for member (admin still can be enter)";
    }

    @GetMapping("/common")
    @PreAuthorize("hasRole('MEMBER') or hasRole('ADMIN')")
    public String bothRoleAccess() {
        return "This page only for member and admin";
    }
}
