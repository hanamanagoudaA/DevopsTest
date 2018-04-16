package com.jcg.prop;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * @author ashraf_sarhan
 * 
 */
@Component
public class DatabaseProperties {

	@Autowired
	private ApplicationProperties applicationProperties;

	private String driverClass;

	private String connectionURL;

	private String username;

	private String password;

	@PostConstruct
	private void init() {
		this.driverClass = applicationProperties
				.getProperty(PropertiesConstants.DB_DRIVERCLASS);
		this.connectionURL = applicationProperties
				.getProperty(PropertiesConstants.DB_CONNECTION_URL);
		this.username = applicationProperties
				.getProperty(PropertiesConstants.DB_USERNAME);
		this.password = applicationProperties
				.getProperty(PropertiesConstants.DB_PASSWORD);
	}

	public String getDriverClass() {
		return driverClass;
	}

	public String getConnectionURL() {
		return connectionURL;
	}

	public String getUsername() {
		return username;
	}

	public String getPassword() {
		return password;
	}

	@Override
	public String toString() {
		return "DatabaseProperties [driverClass=" + driverClass
				+ ", connectionURL=" + connectionURL + ", username=" + username
				+ ", password=" + password + "]";
	}

}
