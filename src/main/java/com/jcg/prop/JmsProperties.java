package com.jcg.prop;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * @author ashraf_sarhan
 * 
 */
@Component
public class JmsProperties {

	@Autowired
	private ApplicationProperties applicationProperties;

	private String factoryInitial;

	private String providerUrl;

	private String queue;

	@PostConstruct
	private void init() {
		this.factoryInitial = applicationProperties
				.getProperty(PropertiesConstants.JMS_FACTORY_INITIAL);
		this.providerUrl = applicationProperties
				.getProperty(PropertiesConstants.JMS_PROVIDER_URL);
		this.queue = applicationProperties
				.getProperty(PropertiesConstants.JMS_QUEUE);
	}

	public String getFactoryInitial() {
		return factoryInitial;
	}

	public String getProviderUrl() {
		return providerUrl;
	}

	public String getQueue() {
		return queue;
	}

	@Override
	public String toString() {
		return "JmsProperties [factoryInitial=" + factoryInitial
				+ ", providerUrl=" + providerUrl + ", queue=" + queue + "]";
	}

}
