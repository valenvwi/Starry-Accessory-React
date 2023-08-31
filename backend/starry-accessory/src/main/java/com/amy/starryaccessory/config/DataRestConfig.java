package com.amy.starryaccessory.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.amy.starryaccessory.entity.Product;

@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {

        private String theAllowedOrigins = "http://localhost:3000";

        @Override
        public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config,
                        CorsRegistry cors) {
                HttpMethod[] theUnsupportedActions = {
                                HttpMethod.POST,
                                HttpMethod.PATCH,
                                HttpMethod.DELETE,
                                HttpMethod.PUT };

                config.exposeIdsFor(Product.class);

                disableHttpMethods(Product.class, config, theUnsupportedActions);

                cors.addMapping(config.getBasePath() + "/**")
                                .allowedOrigins(theAllowedOrigins);
        }

        private void disableHttpMethods(Class theClass,
                        RepositoryRestConfiguration config,
                        HttpMethod[] theUnsupportedActions) {
                config.getExposureConfiguration()
                                .forDomainType(theClass)
                                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                                .withCollectionExposure(
                                                (metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
        }

}