package com.jcg.prop;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.core.env.Environment;

/**
 * @author ashraf_sarhan
 * 
 */
@Configuration
@PropertySources({ @PropertySource(value = "properties/application.properties", ignoreResourceNotFound = true) })
public class ApplicationProperties {

	@Autowired
	private Environment env;

	public String getProperty(String propName) {
		return env.getProperty(propName);
	}

}
