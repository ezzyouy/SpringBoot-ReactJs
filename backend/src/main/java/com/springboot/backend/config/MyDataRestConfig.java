package com.springboot.backend.config;

import com.springboot.backend.entities.Book;
import com.springboot.backend.entities.Messages;
import com.springboot.backend.entities.Review;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private String theAllOwnedOrigin="https://localhost:3000";

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

        HttpMethod[] theUnsupportedAction = {HttpMethod.POST, HttpMethod.PUT, HttpMethod.PATCH, HttpMethod.DELETE};

        config.exposeIdsFor(Book.class);
        config.exposeIdsFor(Review.class);
        config.exposeIdsFor(Messages.class);
        disabledhttpMethod(Messages.class, config, theUnsupportedAction);
        disabledhttpMethod(Book.class, config, theUnsupportedAction);
        disabledhttpMethod(Review.class, config, theUnsupportedAction);
        cors.addMapping(config.getBasePath()+"/**").allowedOrigins(theAllOwnedOrigin);
    }

    private void disabledhttpMethod(Class theClass, RepositoryRestConfiguration config, HttpMethod[] theUnsupportedAction) {
    config.getExposureConfiguration()
            .forDomainType(theClass)
            .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedAction))
            .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedAction));
    }
}
