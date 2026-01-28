'use client';

import React, { useEffect, useState } from 'react';
import {
  Modal,
  Card,
  Typography,
  Space,
  Button,
  Row,
  Col,
} from 'antd';
import { CreditCardOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import CardSelector from '../Cards/CardSelector';
import { VehicleEstimate } from '@/app/Types/AddRide';

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


interface Props {
  open: boolean;
  onClose: () => void;
  estimates: VehicleEstimate[];
  currency: string;
}

const ChooseRideModal: React.FC<Props> = ({ open, onClose, estimates, currency }) => {
  const [step, setStep] = useState<Step>('ride');
  const [selected, setSelected] = useState<VehicleEstimate>(estimates[0]);

  const handleVehicleSelect = (ride: VehicleEstimate) => {
    setSelected(ride);
  }

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
            {estimates.map((ride) => (
              <Card
                key={ride.vehicle_type_id}
                hoverable
                onClick={() => handleVehicleSelect(ride)}
                style={{
                  border:
                    selected.vehicle_type_id === ride.vehicle_type_id
                      ? '2px solid #fe9900'
                      : '1px solid #f0f0f0',
                  borderRadius: 12,
                }}
              >
                <Row align="middle" gutter={16}>
                  <Col>
                    <img
                      src={ride.icon_url}
                      alt={ride.vehicle_name}
                      style={{ width: 64 }}
                    />
                  </Col>

                  <Col flex="auto">
                    <Text strong>{ride.vehicle_name}</Text>
                    <br />
                    <Text type="secondary">{ride.estimated_duration_minutes} min</Text>
                    <br />
                    <Space size={6}>
                      {/* <UserOutlined /> */}
                      <Text>
                        {/* {ride.capacity} */}
                        {ride.distance.toFixed(2)} {ride.unit} away
                      </Text>
                    </Space>
                  </Col>

                  <Col>
                    <Text strong>
                      {ride.total_amount.toFixed(2)} <Text type="secondary">{currency}</Text>
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
              Book Now ({selected.total_amount.toFixed(2)})
            </Button>
          </div>
        </>
      )}
      {step === 'card' && (
        <>
          <Space align="center" size={5}>
            {/* <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={() => setStep('ride')}
              style={{marginBottom:'15px'}}
            /> */}
            {/* <Title level={4}>Select Card</Title> */}
          </Space>
          <CardSelector onDone={() => setStep('ride')} selected={selected} />
        </>
      )}
    </Modal>
  );
};

export default ChooseRideModal;
