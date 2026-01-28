'use client';

import React from 'react';
import { Form, Input, Button, Row, Col, Typography } from 'antd';

interface Props {
  onCancel: () => void;
  onSave: (card: any) => void;
  CardId: string | null;
}

const AddCardForm: React.FC<Props> = ({ onCancel, onSave, CardId }) => {
  const [form] = Form.useForm();
  const { Title } = Typography;
  const formatCard = (v: string) =>
    v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

  const formatExpiry = (v: string) =>
    v.replace(/\D/g, '').slice(0, 4).replace(/(\d{2})(\d{0,2})/, '$1/$2');

  const submit = async () => {
    const values = await form.validateFields();
    onSave({
      id: Date.now().toString(),
      last4: values.cardNumber.slice(-4),
      brand: 'Visa',
      expiry: values.expiry,
    });
  };

  return (
    <Form layout="vertical" form={form}>
    {/* <Title level={4}>Add Card</Title> */}
      <Form.Item
        label="Card Number"
        name="cardNumber"
        rules={[
          { required: true, message: 'Please enter card number' },
          { pattern: /^\d{4} \d{4} \d{4} \d{4}$/, message: 'Card number must be 16 digits'},
        ]}
      >
        <Input
          placeholder="XXXX XXXX XXXX XXXX"
          maxLength={19}
          onChange={(e) =>
            form.setFieldsValue({ cardNumber: formatCard(e.target.value) })
          }
        />
      </Form.Item>

      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            label="Expiry"
            name="expiry"
            rules={[
              { required: true, message: 'Please enter expiry date' },
              { pattern: /^(0[1-9]|1[0-2])\/\d{2}$/, message: 'Expiry must be in MM/YY format'},
            ]}
          >
            <Input
              placeholder="MM/YY"
              maxLength={5}
              onChange={(e) =>
                form.setFieldsValue({ expiry: formatExpiry(e.target.value) })
              }
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="CVV"
            name="cvv"
            rules={[{ required: true, message: 'Please enter CVV' }, { pattern: /^\d{3}$/, message: 'CVV must be 3 digits' }]}
          >
            <Input.Password maxLength={3} placeholder='XXX'/>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={12}>
        <Col span={12}>
          <Button block onClick={onCancel}>
            Cancel
          </Button>
        </Col>
        <Col span={12}>
          <Button block type="primary" style={{ background: '#fe9900' }} onClick={submit}>
            Save Card
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddCardForm;
