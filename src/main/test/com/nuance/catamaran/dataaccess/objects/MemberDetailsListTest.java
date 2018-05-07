package com.nuance.catamaran.dataaccess.objects;

//import static org.fest.assertions.Assertions.assertThat;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;

import com.nuance.catamaran.dataaccess.data.MemberInformation;
import com.nuance.nstub.NStub;

public class MemberDetailsListTest {

	private MemberDetailsList memberDetailsList;
	private MemberInformation member1;
	private MemberInformation member2;
	
	final static String firstName1 = "JR";
	final static String lastName1 = "McLaughlin";
	final static String dateOfBirth1 = "19800101";
	final static String memberNumber1 = "18330AAC";

	final static String firstName2 = "Stefan";
	final static String lastName2 = "Benabdallah";
	final static String dateOfBirth2 = "19440101";
	final static String memberNumber2 = "ABC123456";
	
	final static String returnCode = "0000";
	final static boolean memberFound = true;
	final static boolean canIVRDisambiguate = true;
	
	@Before
	public void setUp() {
		member1 = new MemberInformation();
		member1.setFirstName(firstName1);
		member1.setLastName(lastName1);
		member1.setDateOfBirth(dateOfBirth1);
		member1.setRxBaseMemberID(memberNumber1);
		
		member2 = new MemberInformation();
		member2.setFirstName(firstName2);
		member2.setLastName(lastName2);
		member2.setDateOfBirth(dateOfBirth2);
		member2.setRxBaseMemberID(memberNumber2);
		
		List<MemberInformation> memberDetails = new ArrayList<MemberInformation>();
		memberDetails.add(member1);
		memberDetails.add(member2);
		
		memberDetailsList = new MemberDetailsList();
		memberDetailsList.setReturnCode(returnCode);
		memberDetailsList.setMemberDetails(memberDetails);
		memberDetailsList.setMemberFound(memberFound);
		memberDetailsList.setCanIVRDisambiguate(canIVRDisambiguate);
	}
	
	@Test
	public void testGetterSetter() {
		List<MemberInformation> memberDetails = memberDetailsList.getMemberDetails();
		
//		assertThat(memberDetailsList.getReturnCode()).isEqualTo(returnCode);
//		assertThat(memberDetailsList.getMemberFound()).isEqualTo(memberFound);
//		assertThat(memberDetailsList.getCanIVRDisambiguate()).isEqualTo(canIVRDisambiguate);
//		assertThat(memberDetails).isNotNull();
//		
		NStub nStub = new NStub();
		System.out.println(nStub.toXML(memberDetailsList));
	}
}
