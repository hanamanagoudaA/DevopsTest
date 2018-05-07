package com.nuance.catamaran.dataaccess;

//import static org.fest.assertions.Assertions.assertThat;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.doReturn;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

import com.nuance.catamaran.dataaccess.constants.CallFlowConstants;
import com.nuance.catamaran.dataaccess.constants.CallFlowVariable;
import com.nuance.catamaran.dataaccess.data.MemberInformation;
import com.nuance.catamaran.dataaccess.data.SessionData;
import com.nuance.framework.configuration.ConfigurationException;
import com.nuance.framework.exception.BusinessException;
import com.nuance.framework.exception.SystemException;

public class SelectMemberTest extends DataAccessTest{

    private SelectMember selectMember;
    
    private static final String memberNumber = "18330AAC";
    private static final String dateOfBirth = "19800101";
    private static final String lastName = "Smith";
    private static final String firstName = "John";
    
    private static final String memberNumber2 = "123456789";
    private static final String dateOfBirth2 = "19450404";
    private static final String lastName2 = "Johnson";
    private static final String firstName2 = "Michael";
    
    public SessionData getSingleMemberFixture() {
    	SessionData sessionData = new SessionData();
    	
    	List<MemberInformation> memberInformationList = new ArrayList<MemberInformation>();
        MemberInformation memberInformation = new MemberInformation();
        memberInformation.setRxBaseMemberID(memberNumber);
        memberInformation.setDateOfBirth(dateOfBirth);
        memberInformation.setLastName(lastName);
        memberInformation.setFirstName(firstName);
        memberInformationList.add(memberInformation);
        
        sessionData.setMemberInformation(memberInformationList);
        
        return sessionData;
    }
    
    public SessionData getMultipleMemberFixture() {
    	SessionData sessionData = new SessionData();
    	
    	List<MemberInformation> memberInformationList = new ArrayList<MemberInformation>();
        MemberInformation memberInformation = new MemberInformation();
        memberInformation.setRxBaseMemberID(memberNumber);
        memberInformation.setDateOfBirth(dateOfBirth);
        memberInformation.setLastName(lastName);
        memberInformation.setFirstName(firstName);
        memberInformationList.add(memberInformation);
        
        MemberInformation memberInformation2 = new MemberInformation();
        memberInformation2.setRxBaseMemberID(memberNumber2);
        memberInformation2.setDateOfBirth(dateOfBirth2);
        memberInformation2.setLastName(lastName2);
        memberInformation2.setFirstName(firstName2);
        memberInformationList.add(memberInformation2);
        
        sessionData.setMemberInformation(memberInformationList);
        
        return sessionData;
    }
    
    @Before
    public void setUp() throws ConfigurationException {
        super.setUp();
        
        selectMember = Mockito.spy(new SelectMember());

        addRequestParameter(CallFlowVariable.COLLECTED_DATE_OF_BIRTH, dateOfBirth);
        addRequestParameter(CallFlowVariable.COLLECTED_LAST_NAME, lastName);
        addRequestParameter(CallFlowVariable.COLLECTED_FIRST_NAME, firstName);
    }
    
    @Test
    public void testExecute_memberNotFound() throws SystemException, BusinessException {
    	Map<String, Object> response = selectMember.execute(getRequestDataContext());
        //assertThat(response).isNotNull();

        //assertThat(getResponseValue(response,CallFlowVariable.RETURN_CODE)).isEqualTo(AbstractDataAccessBusinessFunction.KEY_SUCCESS);
        //assertThat(getResponseValue(response,CallFlowVariable.MEMBER_NUMBER_FOUND)).isEqualTo(CallFlowConstants.FALSE);
    }
    
    @Test
    public void testExecute_nullSessionData() throws SystemException, BusinessException {
    	SessionData sessionData = null;
    	doReturn(sessionData).when(selectMember).getSessionData(any(HttpServletRequest.class));
    	
    	Map<String, Object> response = selectMember.execute(getRequestDataContext());
//        assertThat(response).isNotNull();
//
//        assertThat(getResponseValue(response,CallFlowVariable.RETURN_CODE)).isEqualTo(AbstractDataAccessBusinessFunction.KEY_FAILURE);
//        assertThat(getResponseValue(response,CallFlowVariable.MEMBER_NUMBER_FOUND)).isEqualTo(CallFlowConstants.FALSE);
    }
    
    @Test
    public void testExecute_singleMember() throws SystemException, BusinessException {
    	SessionData sessionData = getSingleMemberFixture();
    	doReturn(sessionData).when(selectMember).getSessionData(any(HttpServletRequest.class));
    	
        Map<String, Object> response = selectMember.execute(getRequestDataContext());
//        assertThat(response).isNotNull();
//
//        assertThat(getResponseValue(response,CallFlowVariable.RETURN_CODE)).isEqualTo(AbstractDataAccessBusinessFunction.KEY_SUCCESS);
//        assertThat(getResponseValue(response,CallFlowVariable.MEMBER_NUMBER_FOUND)).isEqualTo(CallFlowConstants.TRUE);
//        assertThat(getResponseValue(response,CallFlowVariable.IS_AMBIGUOUS)).isEqualTo(CallFlowConstants.FALSE);
//        assertThat(getResponseValue(response,CallFlowVariable.DATE_OF_BIRTH)).isEqualTo(dateOfBirth);
//        assertThat(getResponseValue(response,CallFlowVariable.LAST_NAME)).isEqualTo(lastName);
//        assertThat(getResponseValue(response,CallFlowVariable.FIRST_NAME)).isEqualTo(firstName);
//        assertThat(getResponseValue(response,CallFlowVariable.MEMBER_NUMBER)).isEqualTo(memberNumber);
    }
    
    @Test
    public void testExecute_multipleMember() throws SystemException, BusinessException {
        addRequestParameter(CallFlowVariable.COLLECTED_DATE_OF_BIRTH, "wrongDate");
        addRequestParameter(CallFlowVariable.COLLECTED_LAST_NAME, lastName2);
        addRequestParameter(CallFlowVariable.COLLECTED_FIRST_NAME, firstName2);
    	
    	SessionData sessionData = getMultipleMemberFixture();
    	
    	doReturn(sessionData).when(selectMember).getSessionData(any(HttpServletRequest.class));
    	
        Map<String, Object> response = selectMember.execute(getRequestDataContext());
//        assertThat(response).isNotNull();
//
//        assertThat(getResponseValue(response,CallFlowVariable.RETURN_CODE)).isEqualTo(AbstractDataAccessBusinessFunction.KEY_SUCCESS);
//        assertThat(getResponseValue(response,CallFlowVariable.MEMBER_NUMBER_FOUND)).isEqualTo(CallFlowConstants.TRUE);
//        assertThat(getResponseValue(response,CallFlowVariable.IS_AMBIGUOUS)).isEqualTo(CallFlowConstants.FALSE);
//        assertThat(getResponseValue(response,CallFlowVariable.DATE_OF_BIRTH)).isEqualTo(dateOfBirth2);
//        assertThat(getResponseValue(response,CallFlowVariable.LAST_NAME)).isEqualTo(lastName2);
//        assertThat(getResponseValue(response,CallFlowVariable.FIRST_NAME)).isEqualTo(firstName2);
//        assertThat(getResponseValue(response,CallFlowVariable.MEMBER_NUMBER)).isEqualTo(memberNumber2);
    }
}
