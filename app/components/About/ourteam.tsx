'use client';

import { Row, Col, Card, Typography } from 'antd';
import Image from 'next/image';

const { Title, Paragraph, Text } = Typography;

const teamData = [
  {
    id: 1,
    name: 'David Lee',
    role: 'Founder & CEO',
    image: '/image/David-Lee.png',
    description:
      'David is the Founder and CEO of Dryva leading cross-functional teams in Jamaica and India, to support business operations and technology development. He is a graduate of Baruch College where he earned a Bachelors degree in Entrepreneurial Management and a Masters Degree in Real Estate from New York University. David plans to build real estate assets that support logistics operations in his home country of Jamaica.',
  },
  {
    id: 2,
    name: 'Rino King',
    role: 'Finance & Technology Leader',
    image: '/image/portfolio_4.png',
    description:
      'Rino King is a finance and technology leader in the Bahamas. He is the President and owner of CNHL Direct Lenders, a private lending institution, and the owner of Alliance Mobile Solutions, a digital wallet and payment settlement provider. Since 2016, Mr. King has served as a systems analyst across the Caribbean, specializing in market penetration and high-yield ROI strategies. He holds a Bachelor’s degree in International Finance and Banking and is a Certified Project Manager.',
  },
  {
    id: 3,
    name: 'Nigel Fenty',
    role: 'Director',
    image: '/image/Nigel-Fenty.png',
    description:
      'Nigel is the Founder and Managing Director of Cemtel Asset Management (CAM), a Toronto based long-term oriented boutique venture development and alternative asset management firm that specializes in real estate generated returns, venture development services, and corporate development services. CAM assists early-stage to mid-market operators in SaaS, PropTech, Cleantech, Materials and Managed Services to fund, fix, grow and sell their business.',
  },
{
    id: 4,
    name: 'Damian Duncan',
    role: 'Director',
    image: '/image/Damian-Duncan.png',
    description:
      'Damian currently serves as CIO/Investor at Machine Capital Inc., a Barbados-based Private Equity Firm focused on investing in high-growth opportunities across the Caribbean, specifically technologically driven and enabled logistics service businesses as well as alternative financing companies. From 2020-2021 he was the Fintech Strategist of Supreme Ventures Group, rolling out financial solutions that create value for customers and stakeholders alike.Nigel is the Founder and Managing Director of Cemtel Asset Management (CAM), a Toronto based long-term oriented boutique venture development and alternative asset management firm that specializes in real estate generated returns, venture development services, and corporate development services. CAM assists early-stage to mid-market operators in SaaS, PropTech, Cleantech, Materials and Managed Services to fund, fix, grow and sell their business.',
  }
];
export default function OurTeam() {
  return (
    <Row justify="center" style={{ padding: '80px 16px' }}>
      <Col xs={24} lg={20}>
        {/* Section Header */}
        <Row justify="center">
          <Col xs={24} md={16} style={{ textAlign: 'center' }}>
            <Title level={2}>Meet Our Team</Title>
            <Paragraph style={{fontSize:16}}>
              A highly responsive and dedicated team, focused on the consistent
              delivery of excellent service
            </Paragraph>
          </Col>
        </Row>

        {/* Team Cards */}
        <Row gutter={[32, 48]} style={{ marginTop: 48 }}>
          {teamData.map((member) => (
            <Col xs={24} md={12} key={member.id}>
              {/* Profile Card */}
              <Card
                cover={
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={50}
                    height={10}
                    // style={{ objectFit: 'cover', height: '200px', borderRadius: '50%', margin: '20px auto 0' }}
                  />
                }
                bordered={false}
              >
                <Title level={4}>{member.name}</Title>
                <Text type="secondary" style={{fontWeight:500}}>{member.role}</Text>
              </Card>

              {/* Description */}
              <Paragraph style={{ marginTop: 24, fontSize: 16 }}>
                {member.description}
              </Paragraph>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
}
