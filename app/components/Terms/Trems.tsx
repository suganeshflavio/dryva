'use client';

import React from 'react'
import { Modal,Typography  } from 'antd';

const terms=[
    {
      "id": "agreement",
      "heading": "Terms & Conditions",
      "content": [
        "These terms of use constitute a legally binding agreement (the “Agreement”) between you and Dryv Group Limited (“Dryv,” “we,” “us” or “our”) governing your use of the Dryva application, website, and technology platform (collectively, the “Dryva Platform”).",
        "Please be advised this Agreement contains provisions that govern how claims you and Dryv have against each other can be brought these provisions will, with limited exception, require you to submit claims you have against Dryv to binding and final arbitration on an individual basis, not as a claimant or class member in any class, group or representative action or proceeding",
        "By entering into to this Agreement, and/or by using or accessing the Dryva Platform you expressly acknowledge that you understand this Agreement and accept all of its terms. IF YOU DO NOT AGREE TO BE BOUND BY THE TERMS AND CONDITIONS OF THIS AGREEMENT, YOU MAY NOT USE OR ACCESS THE DRYVA PLATFORM.",
        "BY CLICKING “I ACCEPT” YOU AKNOWLEDGE THAT YOU ARE ENTERING INTO THIS AGREEMENT AND THE DRYV GROUP LIMITED PRIVACY POLICY WHICH CAN BE ACCESSED AT: WWW.JADRYVA.COM",
        "EACH TIME YOU USE THE DRYVA PLATFORM AND CLICK “BOOK DRYVA” YOU HEREBY AKNOWLEDGE THAT YOU UNDERSTAND AND AGREE THAT IN EACH INSTANCE YOU WILL BE ENTERING INTO THE “DRYV GROUP LIMITED VEHICLE RENTAL AGREEMENT” WHICH CAN BE ACCESSED AT: WWW.JADRYVA.COM AND SEPERATELY THE “DRIVER SERVICES AGREEMENT” WITH A THIRD PARTY DRIVER WHICH CAN BE ACCESSED AT: WWW.JADRYVA.COM. DRYV IS NOT A PARTY TO THE DRIVER SERVICES AGREEMENT."
      ]
    },
    {
      "id": "arbitration_notice",
      "heading": "THE DRYVA PLATFORM",
      "content": [
        "The Dryva Platform provides an interface where persons who seek transportation services (Users) can rent a vehicle from our fleet of vehicles and also, if the User elects, engage the services of a Dryva. You must create a User account to enable access to the Dryva Platform. Each person may only create one User account, and Dryv reserves the right to shut down any additional accounts. As a User of the Dryva Platform, you authorize Dryv to match you with a Dryva (at your request) based on their availability, the estimated time to pick-up, your destination, your preferences, and platform efficiency, and to cancel an existing match and rematch based on the same considerations.",
        "For purposes of this Agreement, the driving services provided by Dryvas to Users and vehicle rental services provided by Dryv to Users that are matched through the Platform shall be referred to collectively as the “Dryva Services”. Any decision by a User to accept Dryva Services is a decision made in such User’s sole discretion. Each Dryva Service provided by a Dryva to a User or by Dryv to a User shall constitute a separate agreement between such persons."
      ]
    },
    {
      "id": "platform_description",
      "heading": "Modification to the Agreement",
      "content": [
        "In the event Dryv modifies the terms and conditions of this Agreement, such modifications shall be binding on you only upon your acceptance of the modified Agreement. Dryv reserves the right to modify any information referenced in the hyperlinks from this Agreement from time to time, and such modifications shall become effective upon posting. Continued use of the Dryva Platform or Dryva Services after any such changes shall constitute your consent to such changes. Unless material changes are made to the arbitration provisions herein, you agree that modification of this Agreement does not create a renewed opportunity to opt out of arbitration (if applicable)."
      ]
    },
    {
      "id": "eligibility",
      "heading": "Eligibility",
      "content": [
        "The Dryva Platform may only be used by individuals who can form legally binding contracts under applicable law. The Dryva Platform is not available to persons under the age of 18 or Users who have had their User account temporarily or permanently deactivated. By becoming a User, you represent and warrant that you are at least 18 years old and that you have the right, authority and capacity to enter into and abide by the terms and conditions of this Agreement. You may not allow other persons to use your User account, and you agree that you are the sole authorized user of your account."
      ]
    },
    {
      "id": "charges",
      "heading": "Charges",
      "content": [
        "As a User, you understand that request or use of the Dryva Services may result in charges to you (“Charges”). Charges include Rental Fees and other applicable fees, tolls, surcharges, and taxes as set forth on our website, plus any tips to the Dryva that you elect to pay. Dryv has the authority and reserves the right to determine and modify pricing by posting applicable pricing terms to our website or quoting you a price for a specific rental at the time you make a rental or hire a Dryva. Pricing may vary based on the type of service you request. You are responsible for reviewing the applicable fee quote within the Dryva app and shall be responsible for all Charges incurred under your User account regardless of your awareness of such Charges or the amounts thereof."
      ]
    },
    {
      "id": "communications",
      "heading": "Communication from Us",
      "content": [
        "By entering into this Agreement or using the Dryva Platform, you agree to receive communications from us, including via e-mail, text message, calls, and push notifications. You agree that texts, calls or prerecorded messages may be generated by automatic telephone dialing systems. Communications from Dryv may include but are not limited to operational communications concerning your User account or use of the Dryva Platform or Dryva Services, updates concerning new and existing features on the Dryva Platform, communications concerning promotions run by us or our third-party partners, and news concerning industry developments. Standard text messaging charges applied by your mobile phone carrier will apply to text messages we send.",
        "If you wish to opt out of promotional emails, you can unsubscribe from our promotional email list by following the unsubscribe options in the promotional email itself. If you wish to opt out of promotional calls or texts, you may alert our customer service team. You acknowledge that you are not required to consent to receive promotional texts or calls as a condition of using the Dryva Platform or the Dryva Services. If you wish to opt out of all texts or calls from Dryv (including operational or transactional texts or calls), you can contact our customer service team however you acknowledge that opting out of receiving all texts may impact your use of the Dryva Platform or the Dryva Services."
      ]
    },
    {
      "id": "user_information",
      "heading": "Your Information",
      "content": [
        "Your Information is any data you provide, publish or post to or through the Dryva Platform (including any profile information you provide) or send to other Users (including via in-application feedback, any email feature, or through any Dryva-related Facebook, Twitter or other social media posting) (your “Information”). By using the App, you consent to us using your Information to create a User account that will allow you to use the Dryva Platform and participate in the Dryva Services. Our collection and use of personal information in connection with the Dryva Platform and Dryva Services is as provided in our Privacy Policy located at jadryva.app. You are solely responsible for your Information and your interactions with other members of the public, and we act only as a passive conduit for your online posting of your Information. You agree to provide and maintain accurate, current and complete information and that we and other members of the public may rely on your Information as accurate, current and complete. To enable Dryv to use your Information for the purposes described in the Privacy Policy and this Agreement, you grant to us a non-exclusive, perpetual, royalty-free, transferable, sub-licensable right and licence to exercise the copyright, publicity, and database rights you have in your Information, and to use, copy, perform, display and distribute such Information to prepare derivative works, or incorporate into other works, such Information, in any media now known or not currently known. Dryv does not assert any ownership over your Information; rather, as between you and Dryv, subject to the rights granted to us in this Agreement, you retain full ownership of all of your Information and any intellectual property rights or other proprietary rights associated with your Information."
      ]
    },
    {
      "id": "promotions",
      "heading": "Promotions and Referral Programs",
      "content": [
        "Dryv, at its sole discretion, may make available promotions with different features to any Users or prospective Users. These promotions, unless made to you, shall have no bearing whatsoever on your Agreement or relationship with Dryv.",
        "From time to time, Dryv may offer you incentives to refer your friends and family to become new Users of the Dryva Platform. These incentives may come in the form of Dryva Promotional Codes, and Dryv may set or change the incentive types, amounts, terms, restrictions, and qualification requirements for any incentives in its sole discretion."
      ]
    },
    {
      "id": "restricted_activities",
      "heading": "Restricted Activities",
      "content": [
        "With respect to your use of the Dryva Platform and your participation in the Dryva Services, you agree that you will not:",
        "1. impersonate any person or entity;",
        "2. stalk, threaten, or otherwise harass any person, or carry any weapons;",
        "3. violate any law, statute, rule, permit, ordinance or regulation;",
        "4. interfere with or disrupt the Dryva Platform or the servers or networks connected to it;",
        "5. post information or interact on the Dryva Platform or Dryva Services in a manner which is fraudulent, defamatory, abusive, obscene, profane, sexually oriented, harassing, or illegal;",
        "6. use the Dryva Platform in any way that infringes any third party’s rights, including: intellectual property rights, copyright, patent, trademark, trade secret or other proprietary rights or rights of publicity or privacy;",
        "7. post, email or otherwise transmit any malicious code, files or programs designed to interrupt, damage, destroy or limit the functionality of any computer software or hardware or telecommunications equipment or surreptitiously intercept or expropriate any system, data or personal information;",
        "8. forge headers or otherwise manipulate identifiers in order to disguise the origin of any information transmitted through the Dryva Platform;",
        "9. “frame” or “mirror” any part of the Dryva Platform, without our prior written authorization or use meta tags or code or other devices containing any reference to us in order to direct any person to any other web site for any purpose;",
        "10. modify, adapt, translate, reverse engineer, decipher, decompile or otherwise disassemble any portion of the Dryva Platform or any software used on or for the Dryva Platform;",
        "11. rent, lease, lend, sell, redistribute, license or sublicense the Dryva Platform or access to any portion of the Dryva Platform;",
        "12. use any robot, site search/retrieval application, or other manual or automatic device or process to retrieve, index, scrape, “data mine”, or in any way reproduce or circumvent the navigational structure or presentation of the Dryva Platform or its contents;",
        "13. link directly or indirectly to any other web sites;",
        "14. transfer or sell your User account, password and/or identification to any other party",
        "15. discriminate against or harass anyone on the basis of race, origin, religion, gender, physical or mental disability, medical condition, marital status, age or sexual orientation, or cause any third party to engage in the restricted activities above."
      ]
    },
    {
      "id": "intellectual_property",
      "heading": "Intellectual Property",
      "content": [
        "All intellectual property rights in the Dryva Platform shall be owned by Dryv absolutely and in their entirety. These rights include database rights, copyright, design rights (whether registered or unregistered), trademarks (whether registered or unregistered) and other similar rights wherever existing in the world together with the right to apply for protection of the same. All other trademarks, logos, service marks, company or product names set forth in the Dryva Platform are the property of their respective owners. You acknowledge and agree that any questions, comments, suggestions, ideas, feedback or other information (“Submissions”) provided by you to us are non-confidential and shall become the sole property of Dryv. Dryv shall own exclusive rights, including all intellectual property rights, and shall be entitled to the unrestricted use and dissemination of these Submissions for any purpose, commercial or otherwise, without acknowledgment or compensation to you.",
        "Dryva and other Dryva logos, designs, graphics, icons, scripts and service names are trademarks, trademarks or trade dress of Dryva. The Dryva Marks may not be used in any manner that is likely to cause confusion.",
        "You agree that you will not: (1) create any materials that use the Dryva Marks or any derivatives of the Dryva Marks as a trademark, service mark, trade name or trade dress, other than as expressly approved by Dryv in writing; (2) use the Dryva Marks in any way that tends to impair their validity as proprietary trademarks, service marks, trade names or trade dress, or use the Dryva Marks other than in accordance with the terms, conditions and restrictions herein; (3) take any other action that would jeopardize or impair Dryv’s rights as owner of the Dryva Marks or the legality and/or enforceability of the Dryva Marks, including, challenging or opposing Dryv’s ownership in the Dryva Marks; (4) apply for trademark registration or renewal of trademark registration of any of the Dryva Marks, any derivative of the Dryva Marks, any combination of the Dryva Marks and any other name, or any trademark, service mark, trade name, symbol or word which is similar to the Dryva Marks; (5) use the Dryva Marks on or in connection with any product, service or activity that is in violation of any law, statute, regulation or standard."
      ]
    },
    {
      "id": "disclaimers",
      "heading": "Intellectual Property",
      "content": [
        "The following disclaimers are made on behalf of Dryv, our affiliates, subsidiaries, parents, successors and assigns, and each of our respective officers, directors, employees, agents, and shareholders.",
        "Dryv does not provide transportation services, and Dryva is not a transportation carrier. Dryva is not a public passenger transport service. It is up to the User, if it so desires, to secure the services of a Dryva who will only provide driving services in a manner to be directed by the User and using a vehicle provided by the User. We have no control over the quality or safety of the driving services provided by the Dryva.",
        "The Dryva Platform exists solely to facilitate motor vehicle rentals and connecting Users with Dryvas. We do not guarantee and do not promise any specific results from use of the Dryva Platform and/or the Dryva Services, including the ability to provide or receive services at any given location or time.",
        "Dryv is not responsible for the conduct, whether online or offline, of any User of the Dryva Platform or Dryva Services. You are solely responsible for your interactions with other Users. By using the Dryva Platform and participating in the Dryva Services, you agree to accept such risks and agree that Dryv is not responsible for the acts or omissions of Users on the Dryva Platform or participating in the Dryva Services.",
        "You are responsible for the use of your User account and Dryv expressly disclaims any liability arising from the unauthorized use of your User account. Should you suspect that any unauthorized party may be using your User account or you suspect any other breach of security, you agree to notify us immediately.",
        "It is possible for others to obtain information about you that you provide, publish or post to or through the Dryva Platform (including any profile information you provide), send to other Users, or share during the Dryva Services, and to use such information to harass or harm you. We are not responsible for the use of any personal information that you disclose to other Users on the Dryva Platform or through the Services. Please carefully select the type of information that you post on the Dryva Platform or through the Dryva Services or release to others. We disclaim all liability, regardless of the form of action, for the acts or omissions of other Users (including unauthorized users, or “hackers”).",
        "Location data provided by the Dryva Platform is for basic location purposes only and is not intended to be relied upon in situations where precise location information is needed or where erroneous, inaccurate or incomplete location data may lead to death, personal injury, property or environmental damage. Neither Dryv, nor any of its content providers, guarantees the availability, accuracy, completeness, reliability, or timeliness of location data tracked or displayed by the Dryva Platform. Any of your Information, including geolocation data, you upload, provide, or post on the Dryva Platform may be accessible to Norbook and certain Users of the Dryva Platform.",
        "Dryv advises you to use the Dryva Platform with a data plan with unlimited or very high data usage limits, and Dryv shall not be responsible or liable for any fees, costs, or overage charges associated with any data plan you use to access the Dryva Platform."
      ]
    },
    {
      "id": "indemnity",
      "heading": "Indemnity",
      "content": [
        "You will defend, indemnify, and hold Dryv including our affiliates, subsidiaries, parents, successors and assigns, and each of our respective officers, directors, employees, agents, or shareholders harmless from any claims, actions, suits, losses, costs, liabilities and expenses (including reasonable attorneys’ fees) relating to or arising out of your use of the Dryva Platform and participation in the Dryva Services, including: (1) your breach of this Agreement or the documents it incorporates by reference; (2) your violation of any law or the rights of a third party, including, Dryvas, Users, other motorists, and pedestrians, as a result of your own interaction with such third party; (3) any allegation that any materials that you submit to us or transmit through the Dryva Platform or to us infringe or otherwise violate the copyright, trademark, trade secret or other intellectual property or other rights of any third party; (4) any other activities in connection with the Dryva Services. This indemnity shall be applicable without regard to the negligence of any party, including any indemnified person."
      ]
    },
    {
      "id": "limitation_of_liability",
      "heading": "Limitation of Liability",
      "content": [
        "IN NO EVENT WILL DRYV, INCLUDING OUR AFFILIATES, SUBSIDIARIES, PARENTS, SUCCESSORS AND ASSIGNS, AND EACH OF OUR RESPECTIVE OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, OR SHAREHOLDERS (COLLECTIVELY “DRYV” FOR PURPOSES OF THIS SECTION), BE LIABLE TO YOU FOR ANY INCIDENTAL, SPECIAL, EXEMPLARY, PUNITIVE, CONSEQUENTIAL, OR INDIRECT DAMAGES (INCLUDING DAMAGES FOR DELETION, CORRUPTION, LOSS OF DATA, LOSS OF PROGRAMS, FAILURE TO STORE ANY INFORMATION OR OTHER CONTENT MAINTAINED OR TRANSMITTED BY THE DRYVA PLATFORM, SERVICE INTERRUPTIONS, OR FOR THE COST OF PROCUREMENT OF SUBSTITUTE SERVICES) ARISING OUT OF OR IN CONNECTION WITH THE DRYVA PLATFORM, THE DRYVA SERVICES, OR THIS AGREEMENT, HOWEVER ARISING INCLUDING NEGLIGENCE, EVEN IF WE OR OUR AGENTS OR REPRESENTATIVES KNOW OR HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. THE DRYVA PLATFORM MAY BE USED BY YOU TO RENT A VEHICLE AND HIRE A DRYVA IF YOU SO WISH, BUT YOU AGREE THAT DRYV HAS NO RESPONSIBILITY OR LIABILITY TO YOU RELATED TO ANY TRANSPORTATION, OR DRIVER SERVICES PROVIDED TO YOU."
      ]
    },
    {
      "id": "termination",
      "heading": "Term and Termination",
      "content": [
        "This Agreement is effective upon your creation of a User account. This Agreement may be terminated: a) by User, without cause, upon seven (7) days’ prior written notice to Dryv; or b) by either Party immediately, without notice, upon the other Party’s material breach of this Agreement, including but not limited to any breach of this Agreement. In addition, Dryv may terminate this Agreement where (1) Dryv has the good faith belief that such action is necessary to protect the safety of the Dryva community or third parties, provided that in the event of a deactivation, you will be given notice of the potential or actual deactivation and an opportunity to attempt to cure the issue to Dryv’s reasonable satisfaction prior to Dryv permanently terminating the Agreement."
      ]
    },
    {
      "id": "dispute_resolution",
      "heading": "Dispute Resolution (a) Agreement to Binding Arbitration Between You and Dryv.",
      "content": [
        "YOU AND DRYV MUTUALLY AGREE TO WAIVE OUR RESPECTIVE RIGHTS TO RESOLUTION OF DISPUTES IN A COURT OF LAW BY A JUDGE OR JURY AND AGREE TO RESOLVE ANY DISPUTE BY ARBITRATION, as set forth below. This agreement to arbitrate (“Arbitration Agreement”) is governed by the Arbitration Act of Jamaica and survives after the Agreement terminates or your relationship with Dryv ends. ANY ARBITRATION UNDER THIS AGREEMENT WILL TAKE PLACE ON AN INDIVIDUAL BASIS; CLASS ARBITRATIONS AND CLASS ACTIONS ARE NOT PERMITTED. Except as expressly provided below, this Arbitration Agreement applies to all Claims (defined below) between you and Dryv, including our affiliates, subsidiaries, parents, successors and assigns, and each of our respective officers, directors, employees, agents, or shareholders. This Arbitration Agreement also applies to claims between you and Dryv’s service providers, including but not limited to payment processors and such service providers shall be considered intended third party beneficiaries of this Arbitration Agreement.",
        "Except as expressly provided below, ALL DISPUTES AND CLAIMS BETWEEN US (EACH A “CLAIM” AND COLLECTIVELY, “CLAIMS”) SHALL BE EXCLUSIVELY RESOLVED BY BINDING ARBITRATION SOLELY BETWEEN YOU AND DRYV. These Claims include, but are not limited to, any dispute, claim or controversy, whether based on past, present, or future events, arising out of or relating to: this Agreement and prior versions thereof (including the breach, termination, enforcement, interpretation or validity thereof), the Dryva Platform, the Drya Services, any other goods or services made available through the Dryva Platform, your relationship with Dryv, the threatened or actual suspension, deactivation or termination of your User Account or this Agreement, payments made by you or any payments made or allegedly owed to you, any promotions or offers made by Dryv, trade secrets, unfair competition, compensation, breaks and rest periods, expense reimbursement, wrongful termination, discrimination, harassment, retaliation, fraud, defamation, emotional distress, breach of any express or implied contract or covenant, claims arising under claims arising under antitrust laws, claims arising under the Consumer Protection Act; and claims arising under the Electronic Transactions Act, Motor Vehicles Insurance (Third-Party Risks) Act and any other statutes, if any, addressing the same or similar subject matters, and common law claims.",
        "BY AGREEING TO ARBITRATION, YOU UNDERSTAND THAT YOU AND DRYV ARE WAIVING THE RIGHT TO SUE IN COURT OR HAVE A JURY TRIAL FOR ALL CLAIMS, EXCEPT AS EXPRESSLY OTHERWISE PROVIDED IN THIS ARBITRATION AGREEMENT. This Arbitration Agreement is intended to require arbitration of every claim or dispute that can lawfully be arbitrated, except for those claims and disputes which by the terms of this Arbitration Agreement are expressly excluded from the requirement to arbitrate.",
        "The arbitrator shall have no authority to consider or resolve any Claim or issue any relief on any basis other than an individual basis. The arbitrator shall have no authority to consider or resolve any Claim or issue any relief on a class, collective, or representative basis. The arbitrator may award declaratory or injunctive relief only in favor of the individual party seeking relief and only to the extent necessary to provide relief warranted by that party’s individual claims."
      ]
    },
    {
      "id": "Rules",
      "heading": "(b) Rules Governing the Arbitration.",
      "content": [
        "Each dispute submitted by a Party to arbitration shall be heard by a sole arbitrator. Parties may agree to appoint a sole arbitrator or, failing agreement on such sole arbitrator within thirty (30) days after receipt by the other Party of the proposal of a name for such an appointment by the Party who initiated the proceedings, either Party may apply to the General Legal Council of Jamiaca, for the appointment of an arbitrator, who shall act as sole arbitrator for the matter in dispute.",
        "In any arbitration proceeding hereunder:",
        "1. proceedings shall, unless otherwise agreed by the Parties, be held in Kingston, Jamaica at a time and place to be determined by Dryv;",
        "2. the English Language shall be the official language for all purposes;",
        "3. the decision of the sole arbitrator shall be final and binding and shall be enforceable in any court of competent jurisdiction, and the Parties hereby waive any objections to or claims of immunity in respect of enforcement; and the parties agree to equally share the cost of the arbitration."
      ]
    },
    {
      "id": "confidentiality",
      "heading": "Confidentiality",
      "content": [
        "You agree not to use any technical, financial, strategic and other proprietary and confidential information relating to Dryv’s business, operations and properties, information about a User made available to you in connection with such User’s use of the Dryva Platform, which may include the User’s name, pick-up location, contact information and photo (“Confidential Information”) disclosed to you by Dryv for your own use or for any purpose other than as contemplated herein. You shall not disclose or permit disclosure of any Confidential Information to third parties. You agree to take all reasonable measures to protect the secrecy of and avoid disclosure or use of Confidential Information of Dryv in order to prevent it from falling into the public domain. Notwithstanding the above, you shall not have liability to Dryv with regard to any Confidential Information which you can prove: was in the public domain at the time it was disclosed by Dryv or has entered the public domain through no fault of yours; was known to you, without restriction, at the time of disclosure, as demonstrated by files in existence at the time of disclosure; is disclosed with the prior written approval of Dryv; becomes known to you, without restriction, from a source other than Dryv without breach of this Agreement by you and otherwise not in violation of Dryv’s rights; or is disclosed pursuant to the order or requirement of a court, administrative agency, or other governmental body; provided, however, that you shall provide prompt notice of such court order or requirement to Norbook to enable Dryv to seek a protective order or otherwise prevent or restrict such disclosure."
      ]
    },
    {
      "id": "relationship",
      "heading": "Dryva’s Relationship with Dryv",
      "content": [
        "As a Dryva on the Dryva Platform, the relationship between Dryv and its Dryvas is solely that of independent contracting parties. There is no employment agreement between Dryv and any Dryva and no employment relationship has been created between them. Dryvas have no authority to bind Dryv, and no Dryva shall hold himself out as an employee, agent or authorized representative of Dryv.",
        "Dryv does not, and shall not be deemed to, direct or control Dryvas generally or in their performance of driving services specifically, including any acts or omissions in any operation and maintenance of a vehicle provided by you to a Dryva."
      ]
    },
    {
      "id": "general",
      "heading": "General",
      "content": [
        "You retain the sole right to determine when, where, and for how long you will utilize the Dryva Platform. You retain the option to cancel an accepted request for Dryva Services via the Dryva Platform at any time subject to Dryv’s entitlement to charge a cancellation fee.",
        "TBy attaching your full name where requested, and other identifying information which may be required from time to time, and confirming the accuracy of that information, you are taken to have provided your signature for the purposes of the Electronic Transactions Act. You will also receive an electronic receipt for any transaction which you have completed using the Dryva Platform.",
        "This Agreement shall be governed by the laws of Jamaica. If any provision of this Agreement is or becomes invalid or non- binding, the parties shall remain bound by all other provisions of this Agreement. In that event, the parties shall replace the invalid or non-binding provision with provisions that are valid and binding and that have, to the greatest extent possible, a similar effect as the invalid or non-binding provision, given the contents and purpose of this Agreement. You agree that this Agreement and all incorporated agreements may be automatically assigned by Dryv, in our sole discretion by providing notice to you. Except as explicitly stated otherwise, any notices to Dryv shall be given by prepaid registered mail, and return receipt requested to Dryv Group Limited at 109 Old Hope Road Kingston 6 in the parish of Saint Andrew. Any notices to you shall be provided to you through the Dryva Platform or given to you via the email address or physical address you provide to Dryv during the registration process.",
        "Headings are for reference purposes only and in no way define, limit, construe or describe the scope or extent of such section. The words “include”, “includes” and “including” are deemed to be followed by the words “without limitation”. A party’s failure to act with respect to a breach by the other party does not constitute a waiver of the party’s right to act with respect to subsequent or similar breaches. This Agreement sets forth the entire understanding and agreement between you and Dryv with respect to the subject matter hereof and supersedes all previous understandings and agreements between the parties, whether oral or written.",
        "If you have any questions regarding the Dryva Platform or Dryva Services, please contact Dryv Group Limited at 109 Old Hope Road Kingston 6 in the parish of Saint Andrew."
      ]
    },
  ];
const { Title, Paragraph } = Typography;

export default function Trems(props : { setOpenResponsive: (open: boolean) => void; openResponsive: boolean }) {
// const [openResponsive, setOpenResponsive] = useState(false);
  return (
    <div>
        <Modal
        // title={section.heading}
        centered
        open={props.openResponsive}
        onCancel={() => props.setOpenResponsive(false)}
        footer={null}
        width={{
          xs: '90%',
          sm: '80%',
          md: '70%',
          lg: '60%',
          xl: '50%',
          xxl: '40%',
        }}
      >
           {terms.map((section) => (
        <div key={section.id} style={{ marginBottom: 24 }}>
          <Title level={4}>{section.heading}</Title>

          {section.content.map((text, index) => (
            <Paragraph key={index}>{text}</Paragraph>
          ))}
        </div>
      ))}
      </Modal>
    </div>
  )
}
