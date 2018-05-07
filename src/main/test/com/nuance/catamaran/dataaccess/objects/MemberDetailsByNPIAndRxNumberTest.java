package com.nuance.catamaran.dataaccess.objects;

//import static org.fest.assertions.Assertions.assertThat;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

import com.nuance.nstub.NStub;

public class MemberDetailsByNPIAndRxNumberTest {

	final static String dateOfBirth = "19800101";
	final static String firstName = "JR";
	final static String lastName = "McLaughlin";
	final static String memberNumber = "18330AAC";
	final static String drugName = "Lipitor";
	final static String originalClaimFillDate = "20141105";

	@Test
	public void testGetterSetter() {
		final List<String> rejectCodeList = new ArrayList<>();
		rejectCodeList.add("70");
		
		MemberDetailsByNPIAndRxNumber memberDetailsByNPIAndRxNumber = new MemberDetailsByNPIAndRxNumber();
		memberDetailsByNPIAndRxNumber.setDateOfBirth(dateOfBirth);
		memberDetailsByNPIAndRxNumber.setFirstName(firstName);
		memberDetailsByNPIAndRxNumber.setLastName(lastName);
		memberDetailsByNPIAndRxNumber.setMemberNumber(memberNumber);
		memberDetailsByNPIAndRxNumber.setDrugName(drugName);
		memberDetailsByNPIAndRxNumber.setOriginalClaimFillDate(originalClaimFillDate);
		memberDetailsByNPIAndRxNumber.setRejectCodeList(rejectCodeList);
		
//		assertThat(memberDetailsByNPIAndRxNumber.getDateOfBirth()).isEqualTo(dateOfBirth);
//		assertThat(memberDetailsByNPIAndRxNumber.getFirstName()).isEqualTo(firstName);
//		assertThat(memberDetailsByNPIAndRxNumber.getLastName()).isEqualTo(lastName);
//		assertThat(memberDetailsByNPIAndRxNumber.getMemberNumber()).isEqualTo(memberNumber);
//		assertThat(memberDetailsByNPIAndRxNumber.getDrugName()).isEqualTo(drugName);
//		assertThat(memberDetailsByNPIAndRxNumber.getOriginalClaimFillDate()).isEqualTo(originalClaimFillDate);
//		assertThat(memberDetailsByNPIAndRxNumber.getRejectCodeList()).isEqualTo(rejectCodeList);
//		
		NStub nStub = new NStub();
		System.out.println(nStub.toXML(memberDetailsByNPIAndRxNumber));
	}
}
