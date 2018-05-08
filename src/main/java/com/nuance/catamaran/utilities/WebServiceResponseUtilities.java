/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nuance.catamaran.utilities;

import com.sxc.webservice.rxexpressssl.member.Gender;
import com.sxc.webservice.rxexpressssl.member.ClaimDependent;
import com.sxc.webservice.rxexpressssl.member.GetMemberResponseDocument;
import com.sxc.webservice.rxexpressssl.member.GetMemberListResponseDocument;
import com.sxc.webservice.rxexpressssl.member.MemberInformation;
import org.apache.commons.lang.StringUtils;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Cjohns
 */
public class WebServiceResponseUtilities
{

    public static List<com.nuance.catamaran.dataaccess.data.MemberInformation> createMemberList(GetMemberResponseDocument.GetMemberResponse response)
    {
    	List<com.nuance.catamaran.dataaccess.data.MemberInformation> memberList = new ArrayList<>();
        if (response != null)
        {
            if (response.getReturnStatus().getReturnCd().equals("000"))
            {
                MemberInformation member = getMember(response);
                memberList.add(makeNewMember(member));
                if (member.getDependentsArray() != null)
                {
                    ClaimDependent[] dependentArray = response.getDependentsArray();
                    for (ClaimDependent dependent : dependentArray)
                    {
                        memberList.add(makeNewDependentMember(dependent, member));
                    }
                }
            }
        }
        return memberList;
    }

    public static List<com.nuance.catamaran.dataaccess.data.MemberInformation> createMemberList(GetMemberListResponseDocument.GetMemberListResponse response)
    {
    	List<com.nuance.catamaran.dataaccess.data.MemberInformation> memberList = new ArrayList<>();
        if (response != null)
        {
            if (response.getReturnStatus().getReturnCd().equals("000"))
            {
                if (response.getMemberArray() != null)
                {
                    MemberInformation[] memberArray = response.getMemberArray();
                    for (MemberInformation member : memberArray)
                    {
                        memberList.add(makeNewMember(member));
                        if (member.getDependentsArray() != null)
                        {
                            ClaimDependent[] dependentArray = member.getDependentsArray();
                            for (ClaimDependent dependent : dependentArray)
                            {
                                memberList.add(makeNewDependentMember(dependent, member));
                            }
                        }
                    }
                }
            }
        }
        else
        {
            memberList = null;
        }
        return memberList;
    }

    public static com.nuance.catamaran.dataaccess.data.MemberInformation makeNewMember(MemberInformation member)
    {
        com.nuance.catamaran.dataaccess.data.MemberInformation newMember = new com.nuance.catamaran.dataaccess.data.MemberInformation();
        if (member != null)
        {
            String firstName = "";
            String lastName = "";
            newMember.setDateOfBirth((member.getPatientCardHolderDOB() != null) ? member.getPatientCardHolderDOB() : "");
            if(member.getPatientCardHolderNameFirst() != null)
            {
                firstName = member.getPatientCardHolderNameFirst();
                firstName = StringUtil.sanitizeName(firstName);                
            }

            if(member.getPatientCardHolderNameLast() != null)
            {
                lastName = member.getPatientCardHolderNameLast();
                lastName = StringUtil.sanitizeName(lastName);
            }            
            newMember.setFirstName(firstName);
            newMember.setLastName(lastName);
            newMember.setPatientID((member.getPatientNumber() != null) ? member.getPatientNumber() : "");
            newMember.setRxClaimID((member.getRxClaimMemberID() != null) ? member.getRxClaimMemberID() : "");
            newMember.setShippingZipCode((member.getAddrShipping().getZIP() != null) ? member.getAddrShipping().getZIP() : "");
            newMember.setIndividualZipCode((member.getAddrIndividual().getZIP() != null) ? member.getAddrIndividual().getZIP() : "");
            newMember.setZipCode((member.getAddrPrimary().getZIP() != null) ? member.getAddrPrimary().getZIP() : "");
            newMember.setDependentZipCode("");
            newMember.setGender((member.getPatientSex() != null) ? member.getPatientSex().toString() : Gender.X.toString());
            newMember.setCardHolder(true);
            newMember.setPrimaryPhone((member.getAddrPrimary().getPhone1() != null) ? member.getAddrPrimary().getPhone1() : "");
            newMember.setRxCarrierID((member.getCarrierID() != null) ? member.getCarrierID() : "");
            newMember.setRxBaseMemberID((member.getBaseMemberID() != null) ? member.getBaseMemberID() : "");
            newMember.setCreditCardNumber((member.getCreditCardNum() != null) ? member.getCreditCardNum() : "");
            newMember.setCreditCardType((member.getCreditCardType() != null) ? member.getCreditCardType() : "");
            
            if(newMember.getShippingZipCode().length()>5)
            {
                newMember.setShippingZipCode(newMember.getShippingZipCode().substring(0, 5));
            }
            if(newMember.getIndividualZipCode().length()>5)
            {
                newMember.setIndividualZipCode(newMember.getIndividualZipCode().substring(0, 5));
            }
            if(newMember.getZipCode().length()>5)
            {
                newMember.setZipCode(newMember.getZipCode().substring(0, 5));
            }
        }
        return newMember;
    }

    public static MemberInformation getMember(GetMemberResponseDocument.GetMemberResponse member)
    {
        MemberInformation newMember = MemberInformation.Factory.newInstance();
        if ((member != null) && member.getReturnStatus().getReturnCd().equals("000"))
        {
            String firstName = "";
            String lastName = "";
            newMember.setPatientCardHolderDOB((member.getPatientCardHolderDOB() != null) ? member.getPatientCardHolderDOB() : "");                       
            if(member.getPatientCardHolderNameFirst() != null)
            {
                firstName = member.getPatientCardHolderNameFirst();
                firstName = StringUtil.sanitizeName(firstName);                
            }

            if(member.getPatientCardHolderNameLast() != null)
            {
                lastName = member.getPatientCardHolderNameLast();
                lastName = StringUtil.sanitizeName(lastName);
            }      
            newMember.setPatientCardHolderNameFirst(firstName);
            newMember.setPatientCardHolderNameLast(lastName);            
            newMember.setPatientNumber((member.getPatientNumber() != null) ? member.getPatientNumber() : "");
            newMember.setRxClaimMemberID((member.getRxClaimMemberID() != null) ? member.getRxClaimMemberID() : "");
            newMember.setAddrShipping(member.getAddrShipping());
            newMember.setAddrIndividual(member.getAddrIndividual());
            newMember.setAddrPrimary(member.getAddrPrimary());
            newMember.setPatientSex((member.getPatientSex() != null) ? member.getPatientSex() : Gender.X);
            newMember.getAddrPrimary().setPhone1((member.getAddrPrimary().getPhone1() != null) ? member.getAddrPrimary().getPhone1() : "");
            newMember.setCarrierID((member.getCarrierID() != null) ? member.getCarrierID() : "");
            newMember.setBaseMemberID((member.getBaseMemberID() != null) ? member.getBaseMemberID() : "");
            newMember.setCreditCardNum((member.getCreditCardNum() != null) ? member.getCreditCardNum() : "");
            newMember.setCreditCardType((member.getCreditCardType() != null) ? member.getCreditCardType() : "");
        }
        return newMember;
    }

    public static com.nuance.catamaran.dataaccess.data.MemberInformation makeNewDependentMember(ClaimDependent dependent, MemberInformation member)
    {
        com.nuance.catamaran.dataaccess.data.MemberInformation newDependentMember = new com.nuance.catamaran.dataaccess.data.MemberInformation();
        if ((member != null) && (dependent != null))
        {
            String firstName = "";
            String lastName = "";
            newDependentMember.setDateOfBirth((dependent.getDOB() != null) ? dependent.getDOB() : "");            
            if(dependent.getNameFirst() != null)
            {
                firstName = dependent.getNameFirst();
                firstName = StringUtil.sanitizeName(firstName);                
            }

            if(dependent.getNameLast() != null)
            {
                lastName = dependent.getNameLast();
                lastName = StringUtil.sanitizeName(lastName);
            }      
            newDependentMember.setFirstName(firstName);
            newDependentMember.setLastName(lastName);            
            newDependentMember.setPatientID((dependent.getIDNumber() != null) ? dependent.getIDNumber() : "");
            newDependentMember.setRxClaimID((dependent.getRxClaimMemberID() != null) ? dependent.getRxClaimMemberID() : "");
            newDependentMember.setShippingZipCode((member.getAddrShipping().getZIP() != null) ? member.getAddrShipping().getZIP() : "");
            newDependentMember.setIndividualZipCode((member.getAddrIndividual().getZIP() != null) ? member.getAddrIndividual().getZIP() : "");
            newDependentMember.setZipCode((member.getAddrPrimary().getZIP() != null) ? member.getAddrPrimary().getZIP() : "");
            newDependentMember.setDependentZipCode((dependent.getAddrDependent().getZIP() != null) ? dependent.getAddrDependent().getZIP() : "");
            newDependentMember.setGender((dependent.getGender().toString()  != null) ? dependent.getGender().toString() : Gender.X.toString());
            newDependentMember.setPrimaryPhone((member.getAddrPrimary().getPhone1() != null) ? member.getAddrPrimary().getPhone1() : "");
            newDependentMember.setRxCarrierID((member.getCarrierID() != null) ? member.getCarrierID() : "");
            newDependentMember.setRxBaseMemberID((member.getBaseMemberID() != null) ? member.getBaseMemberID() : "");
            newDependentMember.setCreditCardNumber((member.getCreditCardNum() != null) ? member.getCreditCardNum() : "");
            newDependentMember.setCreditCardType((member.getCreditCardType() != null) ? member.getCreditCardType() : "");
            if(newDependentMember.getShippingZipCode().length()>5)
            {
                newDependentMember.setShippingZipCode(newDependentMember.getShippingZipCode().substring(0, 5));
            }
            if(newDependentMember.getIndividualZipCode().length()>5)
            {
                newDependentMember.setIndividualZipCode(newDependentMember.getIndividualZipCode().substring(0, 5));
            }
            if(newDependentMember.getZipCode().length()>5)
            {
                newDependentMember.setZipCode(newDependentMember.getZipCode().substring(0, 5));
            }
            if(newDependentMember.getDependentZipCode().length()>5)
            {
                newDependentMember.setDependentZipCode(newDependentMember.getDependentZipCode().substring(0, 5));
            }
        }
        return newDependentMember;
    }
}
