'use client';

import React, { useState } from 'react';
import {
  Modal,
  Card,
  Typography,
  Space,
  Button,
  Row,
  Col,
} from 'antd';
import { UserOutlined, CreditCardOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import CardSelector from '../Cards/CardSelector';

const { Title, Text } = Typography;

type Step = 'ride' | 'card';

interface Ride {
  id: string;
  title: string;
  description: string;
  price: number;
  capacity: number;
  image: string;
}

const rides: Ride[] = [
  {
    id: 'shuttle',
    title: 'Shuttle (4+ ppl)',
    description: 'Van (5+ suitcases)',
    price: 265.63,
    capacity: 8,
    image: '/images/van.png',
  },
  {
    id: 'spacious',
    title: 'Spacious Van',
    description: 'Van or SUV (3–4 suitcases)',
    price: 214.67,
    capacity: 3,
    image: '/images/suv.png',
  },
  {
    id: 'sedan',
    title: 'Sedan',
    description: 'Economy (1–2 suitcases)',
    price: 211.05,
    capacity: 3,
    image: '/images/sedan.png',
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

const ChooseRideModal: React.FC<Props> = ({ open, onClose }) => {
      const [step, setStep] = useState<Step>('ride');
  const [selected, setSelected] = useState<Ride>(rides[0]);

  return (
    <Modal
      centered
      open={open}
      onCancel={onClose}
      footer={null}
      width={{
        xs: '95%',
        sm: 420,
        md: 480,
        lg: 520,
      }}
    >
        {step === 'ride' && (
        <>
      <Title level={4}>Choose a Ride</Title>

      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        {rides.map((ride) => (
          <Card
            key={ride.id}
            hoverable
            onClick={() => setSelected(ride)}
            style={{
              border:
                selected.id === ride.id
                  ? '2px solid #fe9900'
                  : '1px solid #f0f0f0',
              borderRadius: 12,
            }}
          >
            <Row align="middle" gutter={16}>
              <Col>
                <img
                  src={ride.image}
                  alt={ride.title}
                  style={{ width: 64 }}
                />
              </Col>

              <Col flex="auto">
                <Text strong>{ride.title}</Text>
                <br />
                <Text type="secondary">{ride.description}</Text>
                <br />
                <Space size={6}>
                  <UserOutlined />
                  <Text>{ride.capacity}</Text>
                </Space>
              </Col>

              <Col>
                <Text strong>
                  {ride.price.toFixed(2)} <Text type="secondary">USD</Text>
                </Text>
              </Col>
            </Row>
          </Card>
        ))}
      </Space>

      {/* Footer Actions */}
      <div
        style={{
          display: 'flex',
          gap: 12,
          marginTop: 24,
        }}
      >
        <Button block icon={<CreditCardOutlined />} onClick={() => setStep('card')}>
          Select Card
        </Button>

        <Button
          block
          type="primary"
          style={{ background: '#fe9900' }}
        >
          Book Now ({selected.price.toFixed(2)})
        </Button>
      </div>
      </>
      )}
        {step === 'card' && (
        <>
        <Space align="center" size={5}>
        <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={() => setStep('ride')}
              style={{marginBottom:'15px'}}
            />
    <Title level={4}>Select Payment</Title>
    </Space>
    <CardSelector onDone={() => setStep('ride')} />
        </>
      )}
    </Modal>
  );
};

export default ChooseRideModal;
