package com.nuance.catamaran.utilities;

import java.util.List;

import com.nuance.catamaran.dataaccess.constants.CallFlowVariable;
import com.nuance.framework.vxml.service.ServiceContext;

@SuppressWarnings("unchecked")
public class ServiceContextUtil {
	
	public static String getStringParameter(ServiceContext serviceContext, CallFlowVariable callFlowVariable) {
		String stringAttribute = null;
		
		Object objectAttribute = serviceContext.getRequest().getParameter(callFlowVariable.getCallFlowValue());
		
		if (objectAttribute != null && objectAttribute instanceof String) {
			stringAttribute = (String) objectAttribute;
		}
		
		return stringAttribute;
	}
	
	public static String getStringAttribute(ServiceContext serviceContext, CallFlowVariable callFlowVariable) {
		String stringAttribute = null;
		
		Object objectAttribute = serviceContext.getRequest().getAttribute(callFlowVariable.getCallFlowValue());
		
		if (objectAttribute != null && objectAttribute instanceof String) {
			stringAttribute = (String) objectAttribute;
		}
		
		return stringAttribute;
	}
	
	public static int getIntAttribute(ServiceContext serviceContext, CallFlowVariable callFlowVariable, int defaultValue) {
		int intAttribute = defaultValue;
		
		Object objectAttribute = serviceContext.getRequest().getAttribute(callFlowVariable.getCallFlowValue());
		
		if (objectAttribute != null && objectAttribute instanceof Integer) {
			intAttribute = (Integer) objectAttribute;
		}
		
		return intAttribute;
	}
	
	public static boolean getBooleanAttribute(ServiceContext serviceContext, CallFlowVariable callFlowVariable, boolean defaultValue) {
		boolean booleanAttribute = defaultValue;
		
		Object objectAttribute = serviceContext.getRequest().getAttribute(callFlowVariable.getCallFlowValue());
		
		if (objectAttribute != null && objectAttribute instanceof Boolean) {
			booleanAttribute = (Boolean) objectAttribute;
		}
		
		return booleanAttribute;
	}
	
	public static List<String> getRequestStringList(ServiceContext serviceContext, CallFlowVariable callFlowVariable) {
		List<String> stringList = null;
		
		Object objectAttribute = serviceContext.getRequest().getAttribute(callFlowVariable.getCallFlowValue());
		
		if (objectAttribute != null && objectAttribute instanceof List) {
			stringList = (List<String>) objectAttribute;
		}
		
		return stringList;
	}
	
	public static List<String> getSessionStringList(ServiceContext serviceContext, CallFlowVariable callFlowVariable) {
		List<String> stringList = null;
		
		Object objectAttribute = serviceContext.getSession().getAttribute(callFlowVariable.getCallFlowValue());
		
		if (objectAttribute != null && objectAttribute instanceof List) {
			stringList = (List<String>) objectAttribute;
		}
		
		return stringList;
	}
}
