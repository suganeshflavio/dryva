'use client';

import { Row, Col, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const content = [
  `Having its roots in Jamaica, Dryva is a technology powered transportation
  company revolutionizing mobility and delivery services for Caribbean people
  and travelers.`,

  `With familiar solutions that cater to both corporate clients and individual
  customers alike, Dryva delivers unparalleled customer service and is positioned
  as a premium brand in Caribbean transportation.`,

  `Dryva ensures reliability, efficiency, and superior experiences for every
  customer with services that include corporate travel, tourism, and third-party
  logistics (3PL).`,

  `Providing a trusted network for both local and international partners, Dryva
  specializes in airport transfers, corporate transportation, group and vacation
  travel, as well as same-day couriers and logistics.`
];
export default function WhoWeAre() {
  return (
    <Row justify="start" style={{ width: '100%', padding: '34px 86px' }}>
      <Col xs={24} md={20} lg={16}>
        <Title level={2}>Who We Are</Title>
 {content.map((text, index) => (
        <Paragraph key={index} style={{fontSize:'18px', width: '150%'}}>
          {/* <Typography.Title editable level={3}></Typography.Title> */}
           {text}
        </Paragraph>
) )}
      </Col>
    </Row>
  );
}
