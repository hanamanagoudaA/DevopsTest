package com.jcg.test;

import junit.framework.TestCase;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.jcg.prop.DatabaseProperties;
import com.jcg.prop.JmsProperties;

/**
 * @author ashraf_sarhan
 * 
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:spring/app-context.xml")
public class ApplicationPropertiesTest extends TestCase {
	
	@Autowired
	private DatabaseProperties databaseProperties;
	
	@Autowired
	private JmsProperties jmsProperties;
	
	@Test
	public void testApplicationProperties() {
		
		// Using application properties through properties wrappers
		System.out.println(databaseProperties.toString());
		System.out.println(jmsProperties.toString());
		
	}
	
}
