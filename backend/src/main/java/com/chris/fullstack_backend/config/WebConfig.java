package com.chris.fullstack_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration // Marks this class as a configuration class for Spring
public class WebConfig implements WebMvcConfigurer {

    /**
     * Configures resource handling for serving static files.
     * @param registry The ResourceHandlerRegistry to configure.
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Maps requests for /uploads/** to files in the uploads/ directory
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");
    }

    /**
     * Configures CORS (Cross-Origin Resource Sharing) settings.
     * @param registry The CorsRegistry to configure.
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Allows requests from the specified origin with certain methods and headers
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173/ContactApp") // Allow requests from the frontend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Allow these HTTP methods
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(true); // Allow cookies and authentication credentials
    }
}
