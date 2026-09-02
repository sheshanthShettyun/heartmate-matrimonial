package com.matrimonial.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI matrimonialOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Matrimonial Management System API")
                        .version("1.0.0")
                        .description("Basic internship-level Matrimonial Website REST API using Spring Boot, JPA/Hibernate and MySQL."));
    }
}
