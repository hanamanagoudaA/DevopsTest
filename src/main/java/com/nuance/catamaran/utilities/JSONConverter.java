package com.nuance.catamaran.utilities;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nuance.framework.exception.BusinessException;
import com.nuance.framework.logging.Logger;
import com.nuance.framework.logging.LoggerManager;

public class JSONConverter {

	private static ObjectMapper mapper = new ObjectMapper(); // can reuse, share globally
	private static Logger logger = LoggerManager.getLogger(JSONConverter.class.getName());

	/**
	 * API to convert JSON to Object
	 * @param json
	 * @param Klass
	 * @return
	 * @throws BusinessException
	 */
	public static <T> T convertJsonToObject(String json, Class<T> Klass) throws BusinessException
	{
		T request;
		try {
		 	String resultJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(json);
			logger.debug(Klass.getName()+" : "+ resultJson);
			request = mapper.readValue(json, Klass);
		} catch (JsonParseException e) {
			logger.error("Unable to Parse the JSON String", e);
			throw new BusinessException("Unable to Parse the JSON String", e);

		} catch (JsonMappingException e) {
			logger.error("Unable to Parse the JSON String", e);
			throw new BusinessException("Unable to Parse the JSON String", e);

		} catch (IOException e) {
			logger.error("Unable to Parse the JSON String", e);
			
			throw new BusinessException("Unable to Parse the JSON String", e);

		}
		return request;
	}

	/**
	 * This API should be used to convert to JSON format
	 * @param src
	 * @return
	 * @throws BusinessException
	 */
	public static String convertObjectToJson(Object src) throws BusinessException
	{
		String result;
		try {
			result = mapper.writeValueAsString(src);
			//result = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(src);
 		} catch (JsonProcessingException e) {
 			logger.error("Unable to Convert Object to Json", e);
  			throw new BusinessException("Unable to Convert Object to Json", e);
		}
		return result;
	}
	/**
	 * This API should be used to convert to JSON pretty Print format which is helpful for logging
	 * @param src
	 * @return
	 * @throws BusinessException
	 */
	
	public static String convertObjectToPrettyPrintJson(Object src) throws BusinessException
	{
		String result;
		try {
			//result = mapper.writeValueAsString(src);
			result = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(src);
 		} catch (JsonProcessingException e) {
 			logger.error("Unable to Convert Object to Json", e);
  			throw new BusinessException("Unable to Convert Object to Json", e);
		}
		return result;
	}

}
