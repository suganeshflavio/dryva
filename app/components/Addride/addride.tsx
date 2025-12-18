'use client';

import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  DatePicker,
  TimePicker,
  InputNumber,
  Button,
  Typography,
  message,
} from 'antd';
import dayjs from 'dayjs';
import VehicleAdd from '../VehicleAdd/vehicleadd';

const { Title } = Typography;

interface RideFormValues {
  pickup: string;
  drop: string;
  passengers: number;
  date: dayjs.Dayjs;
  time: dayjs.Dayjs;
  instructions?: string;
}

const AddRide: React.FC = () => {
  const [form] = Form.useForm<RideFormValues>();
    const [openRideModal, setOpenRideModal] = useState(false);

  // Set default date & time
  useEffect(() => {
    form.setFieldsValue({
      date: dayjs(),
      time: dayjs(),
      passengers: 1,
    });
  }, [form]);

  const onFinish = (values: RideFormValues) => {
    console.log('Ride Details:', values);
    setOpenRideModal(true)
    message.success('Searching rides...');
  };

  return (
    <Row gutter={[24, 24]}>
      {/* LEFT FORM */}
      <Col xs={24} md={10} lg={8} >
        <Card style={{marginTop:'90px', marginLeft: '70px', maxHeight:'120vh'}}>
          <Title level={4}>Book a Ride</Title>

          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            requiredMark={false}
          >
            <Form.Item
              name="pickup"
            //   label="Pickup Location"
              rules={[{ required: true, message: 'Pickup location is required' }]}
            >
              <Input placeholder="Ewarton, Jamaica" />
            </Form.Item>

            <Form.Item
              name="drop"
            //   label="Drop Location"
              rules={[{ required: true, message: 'Drop location is required' }]}
            >
              <Input placeholder="Annotto Bay, Jamaica" />
            </Form.Item>
             <Form.Item
              name="small suitcase"
            //   label="Passengers"
              rules={[
                // { required: true },
                {
                  type: 'number',
                  max: 10,
                  message: 'Maximum 10 small suitcases allowed',
                },
              ]}
            >
              <InputNumber min={1} max={10} style={{ width: '100%' }} placeholder='Enter number of small suitcases'/>
            </Form.Item>
             <Form.Item
              name="large suitcase"
            //   label="Passengers"
              rules={[
                // { required: true },
                {
                  type: 'number',
                  max: 10,
                  message: 'Maximum 10 large suitcases allowed',
                },
              ]}
            >
              <InputNumber min={1} max={10} style={{ width: '100%' }} placeholder='Enter number of large suitcases'/>
            </Form.Item>
            <Form.Item
              name="passengers"
            //   label="Passengers"
              rules={[
                { required: true },
                {
                  type: 'number',
                  min: 1,
                  message: 'At least 1 passenger is required',
                },
                {
                  type: 'number',
                  max: 6,
                  message: 'Maximum 6 passengers allowed',
                },
              ]}
            >
              <InputNumber min={1} max={6} style={{ width: '100%' }} placeholder='Enter number of passengers'/>
            </Form.Item>

            <Row gutter={12}>
              <Col span={12}>
                <Form.Item
                  name="date"
                //   label="Date"
                  rules={[{ required: true }]}
                >
                  <DatePicker
                    style={{ width: '100%' }}
                    disabledDate={(current) =>
                      current && current < dayjs().startOf('day')
                    }
                    placeholder="Select date"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="time"
                //   label="Time"
                  rules={[{ required: true }]}
                >
                  <TimePicker style={{ width: '100%' }} format="HH:mm" placeholder="Select time" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="instructions"
            //  label="Pickup Instructions"
             >
              <Input.TextArea
                rows={3}
                placeholder="Contact person, airline, flight number, etc."
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              style={{ background: '#fe9900' }}
            >
              Search
            </Button>
          </Form>
        </Card>
      </Col>
                   {openRideModal && (
                    // <div>
                      <VehicleAdd open={openRideModal}
  onClose={() => setOpenRideModal(false)}/>
  )}
      {/* RIGHT MAP */}
      <Col xs={24} md={14} lg={16} style={{marginTop:'90px', maxHeight:'120vh'}}>
        <Card style={{ height: '99%' }}>
          <iframe
            title="map"
            src="https://www.google.com/maps?q=Ewarton,Jamaica&z=10&output=embed"
            style={{
              border: 0,
              width: '90%',
              height: '100%',
              minHeight: 520,
              borderRadius: 8,
            }}
            loading="lazy"
          />
        </Card>
      </Col>
    </Row>
  );
};

export default AddRide;
