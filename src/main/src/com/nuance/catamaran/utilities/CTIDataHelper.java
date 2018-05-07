/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nuance.catamaran.utilities;


import com.sun.jersey.core.util.MultivaluedMapImpl;
import javax.ws.rs.core.MultivaluedMap;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

/**
 *
 * @author ivrdev2
 */
public class CTIDataHelper {
    public String createJsonString(String contextID,MultivaluedMap map)
    {
        JSONObject objData = new JSONObject();
        objData.putAll(map);
        JSONObject jsonObj=new JSONObject();
        jsonObj.put("contextID", contextID);        
        jsonObj.put("data", objData);        
        return jsonObj.toJSONString();
    }
    
    public MultivaluedMap parseJsonString(String input) throws ParseException {
        MultivaluedMap map = new MultivaluedMapImpl();
        JSONParser parser = new JSONParser();
        Object obj = parser.parse(input);
        JSONObject jsonObject = (JSONObject) obj;
        for (Object fieldName : jsonObject.keySet()) {            
            if (fieldName.toString().compareToIgnoreCase("data") == 0) {
                JSONObject childJasonObject = (JSONObject) jsonObject.get(fieldName);
                for (Object childFieldName : childJasonObject.keySet()) {                    
                    map.put(childFieldName.toString(), childJasonObject.get(childFieldName).toString());
                }
            }
        }
        return map;
    }
}
