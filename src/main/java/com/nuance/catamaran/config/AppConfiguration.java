package com.nuance.catamaran.config;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import com.nuance.catamaran.dataaccess.constants.ReasonCategory;
import com.nuance.catamaran.dataaccess.constants.ReasonCode;
import java.util.HashSet;

public class AppConfiguration {

    private HashMap<String,Properties> tfnPropertiesMap = new HashMap<String,Properties>();
    private HashMap<String,String> ndcDrugMap;
    private HashMap<String,String> ndcDosageMap;
    private Map<ReasonCode, ReasonCategory> reasonCodeMap;
    private HashMap<String,Boolean> drugPromptMap;
    private HashSet<String> byPassANISet;
    private HashMap<String,String> rxcDomainMap;

    private static AppConfiguration instance = null;
    public AppConfiguration() {
        // Exists only to defeat instantiation.
    }

    public static AppConfiguration getInstance() {
        if(instance == null) {
            instance = new AppConfiguration();
        }
        return instance;
    }
    
    public void setTFNProperties(String tfn, Properties properties){
        tfnPropertiesMap.put(tfn, properties);
    }

    public Properties getTFNProperties(String tfn){
        return tfnPropertiesMap.get(tfn);
    }

    public HashMap<String, String> getNdcDrugMap() {
        return ndcDrugMap;
    }

    public void setNdcDrugMap(HashMap<String, String> ndcDrugMap) {
        this.ndcDrugMap = ndcDrugMap;
    }

    public HashMap<String, String> getNdcDosageMap() {
        return ndcDosageMap;
    }

    public void setNdcDosageMap(HashMap<String, String> ndcDosageMap) {
        this.ndcDosageMap = ndcDosageMap;
    }

    public Map<ReasonCode, ReasonCategory> getReasonCodeMap() {
        return reasonCodeMap;
    }

    public void setReasonCodeMap(Map<ReasonCode, ReasonCategory> reasonCodeMap) {
        this.reasonCodeMap = reasonCodeMap;
    }

    public HashMap<String, Boolean> getDrugPromptMap() {
        return drugPromptMap;
    }

    public void setDrugPromptMap(HashMap<String, Boolean> drugPromptMap) {
        this.drugPromptMap = drugPromptMap;
    }
    
    public HashMap<String, String> getRxcDomainMap() {
        return rxcDomainMap;
    }

    public void setRxcDomainMap(HashMap<String, String> rxcDomainMap) {
        this.rxcDomainMap = rxcDomainMap;
    }

    public HashSet<String> getByPassANISet() {
        return byPassANISet;
    }

    public void setByPassANISet(HashSet<String> byPassANISet) {
        this.byPassANISet = byPassANISet;
    }
    
}
