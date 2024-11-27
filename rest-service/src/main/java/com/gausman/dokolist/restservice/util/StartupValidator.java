package com.gausman.dokolist.restservice.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class StartupValidator implements CommandLineRunner {

    @Value("${application.security.jwt.secret}")
    private String jwtSecret;

    @Override
    public void run(String... args) {
        if ("secret_dev".equals(jwtSecret)) {
            System.err.println("WARNING: Default JWT_SECRET value is being used!");
        } else {
            System.out.println("JWT_SECRET is properly set: " + jwtSecret);
        }
    }
}
