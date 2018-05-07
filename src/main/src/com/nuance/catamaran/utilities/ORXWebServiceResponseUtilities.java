/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nuance.catamaran.utilities;

import com.unitedhealthgroup.optumrx.getpatient.v1_00.GetPatientResponseType;
import com.unitedhealthgroup.optumrx.getpatient.v1_00.GetPatientType;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author ivrdev2
 */
public class ORXWebServiceResponseUtilities {

    public static List<com.nuance.catamaran.dataaccess.data.MemberInformation> createPatientList(GetPatientResponseType response, String dateOfBirth) {
        List<com.nuance.catamaran.dataaccess.data.MemberInformation> memberList = new ArrayList<>();
        com.nuance.catamaran.dataaccess.data.MemberInformation member = new com.nuance.catamaran.dataaccess.data.MemberInformation();

        String firstName = "";
        String lastName = "";
        String patientID = "";
        String gender = "";
        String primaryPhone = "";
        String dob = "";
        String ZipCodeList = "";

        //GetPatientType getPatientType = response.getListOfPatients().getGetPatientArray(0);
        for (GetPatientType getPatientType : response.getListOfPatients().getGetPatientArray()) {
            if (getPatientType.getDemographics().getDateOfBirth() != null) {
                if (getPatientType.getDemographics().getDateOfBirth().replace("-", "").trim().compareToIgnoreCase(dateOfBirth) == 0) {
                    member.setDateOfBirth(getPatientType.getDemographics().getDateOfBirth());
                    if (getPatientType.getDemographics().getFirstName() != null) {
                        firstName = getPatientType.getDemographics().getFirstName();
                        firstName = StringUtil.sanitizeName(firstName);
                    }

                    if (getPatientType.getDemographics().getLastName() != null) {
                        lastName = getPatientType.getDemographics().getLastName();
                        lastName = StringUtil.sanitizeName(lastName);
                    }

                    if (getPatientType.getPatientId() != null) {
                        patientID = getPatientType.getPatientId();
                    }
                    if (getPatientType.getDemographics().getGender() != null) {
                        if (getPatientType.getDemographics().getGender().trim().compareToIgnoreCase("MALE") == 0) {
                            gender = "M";
                        } else {
                            gender = "F";
                        }
                    }
                    if (getPatientType.getDemographics().getDateOfBirth() != null) {
                        dob = getPatientType.getDemographics().getDateOfBirth();
                    }
                    member.setFirstName(firstName);
                    member.setLastName(lastName);
                    member.setPatientID(patientID);
                    member.setDateOfBirth(dob.replace("-", ""));
                    member.setGender(gender);

                    if (getPatientType.getTelephoneList() != null) {
                        if (getPatientType.getTelephoneList().getTelephoneArray() != null) {
                            if (getPatientType.getTelephoneList().getTelephoneArray(0).getTelephoneNumber() != null) {
                                primaryPhone = getPatientType.getTelephoneList().getTelephoneArray(0).getTelephoneNumber();
                            }
                        }
                    }
                    if (getPatientType.getListOfAddress() != null) {
                        if (getPatientType.getListOfAddress().getPostalAddressArray() != null) {
                            if (getPatientType.getListOfAddress().getPostalAddressArray().length == 1) {                                
                                member.setZipCode((getPatientType.getListOfAddress().getPostalAddressArray(0).getPostalCode().getPart1() != null) ? getPatientType.getListOfAddress().getPostalAddressArray(0).getPostalCode().getPart1() : "");                                
                                member.setZipCode((member.getZipCode().length()>5) ? member.getZipCode().substring(0,5) : member.getZipCode());                                
                            }
                            if (getPatientType.getListOfAddress().getPostalAddressArray().length == 2) {
                                member.setShippingZipCode((getPatientType.getListOfAddress().getPostalAddressArray(1).getPostalCode().getPart1() != null) ? getPatientType.getListOfAddress().getPostalAddressArray(1).getPostalCode().getPart1() : "");                                
                                member.setShippingZipCode((member.getShippingZipCode().length()>5) ? member.getShippingZipCode().substring(0,5) : member.getShippingZipCode());                                
                            } 
                            if (getPatientType.getListOfAddress().getPostalAddressArray().length == 3) {
                                member.setIndividualZipCode((getPatientType.getListOfAddress().getPostalAddressArray(2).getPostalCode().getPart1() != null) ? getPatientType.getListOfAddress().getPostalAddressArray(2).getPostalCode().getPart1() : "");                                                                
                                member.setIndividualZipCode((member.getIndividualZipCode().length()>5) ? member.getIndividualZipCode().substring(0,5) : member.getIndividualZipCode());                                
                            }
                            if (getPatientType.getListOfAddress().getPostalAddressArray().length == 4) {
                                member.setDependentZipCode((getPatientType.getListOfAddress().getPostalAddressArray(3).getPostalCode().getPart1() != null) ? getPatientType.getListOfAddress().getPostalAddressArray(3).getPostalCode().getPart1() : "");                                                                
                                member.setDependentZipCode((member.getDependentZipCode().length()>5) ? member.getDependentZipCode().substring(0,5) : member.getDependentZipCode());                                
                            }
                        }
                    }
                    
                    member.setCardHolder(true);
                    memberList.add(member);
                }
            }
        }
        return memberList;
    }
}
