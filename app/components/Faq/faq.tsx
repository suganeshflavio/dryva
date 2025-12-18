'use client';

import { Row, Col, Typography, Collapse, Card } from 'antd';

const { Title, Paragraph } = Typography;
const faqData = [
  {
    key: '1',
    question: 'Can I schedule a ride in advance?',
    answer:
      'Yes, you can schedule a ride in advance by selecting a future date and time.',
  },
  {
    key: '2',
    question: 'What factors affect the fare estimate?',
    answer:
      'Fare estimates are calculated based on factors like distance, time, traffic, and surge pricing.',
  },
  {
    key: '3',
    question: 'How do I book a ride?',
    answer:
      'Open the Dryva app, enter your pickup and drop-off locations, select a vehicle type, and tap on Book Now.',
  },
  {
    key: '4',
    question: 'Can I make multiple stops?',
    answer:
      'Yes, you can add up to 5 stops in any one trip by using the + Add Stop button. Amend the answer to the "Schedule in Advance" question to this: Yes, you can schedule a ride in advance by tapping the "Now" button and selecting a future date and time.',
  },
  {
    key: '5',
    question: 'Can I go out of town if I book hourly?',
    answer:
      'No, hourly rides have a maximum of 8 hours and must be done in Kingston and St. Andrew.',
  },
  {
    key: '6',
    question: 'Do you accept cash as payment?',
    answer:
      'We are 100% cashless, payment must be made using a debit/credit card.',
  },
  {
    key: '7',
    question: 'How many persons can I bring on a trip?',
    answer:
      'Up to 4 persons as we charge per trip and not per person.',
  },
];

export default function FAQ() {
  const leftFAQs = faqData.slice(0, 5);
  const rightFAQs = faqData.slice(5);

  return (
    <Row justify="center" style={{ padding: '80px 16px',
    //  background: '#fafafa'
      }}>
      <Col xs={24} lg={20}>
        {/* Header Banner */}
        <Card bordered={false} style={{ marginBottom: 48, marginTop: 16,backgroundImage: "url('/images/faq-bg.png')", // your image path
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat', }}>
        <div
    style={{
    //   background: 'rgba(255, 255, 255, 0.85)',
      padding: 24,
      borderRadius: 8,
    }}
  >
          <Title level={2}>Frequently Asked Questions</Title>
          <Paragraph>
            Stuck on something? We're here to help at your questions and answers
            in one place.
          </Paragraph>
          </div>
        </Card>

        {/* FAQ Content */}
        <Row gutter={[32, 24]}>
          {/* Left Column */}
          <Col xs={24} md={12}>
            <Collapse
              accordion
              items={leftFAQs.map((faq) => ({
                key: faq.key,
                label: faq.question,
                children: <Paragraph>{faq.answer}</Paragraph>,
              }))}
            />
          </Col>

          {/* Right Column */}
          <Col xs={24} md={12}>
            <Collapse
              accordion
              items={rightFAQs.map((faq) => ({
                key: faq.key,
                label: faq.question,
                children: <Paragraph>{faq.answer}</Paragraph>,
              }))}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
