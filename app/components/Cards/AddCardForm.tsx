'use client';

import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';

interface Props {
  onCancel: () => void;
  onSave: (card: any) => void;
}

const AddCardForm: React.FC<Props> = ({ onCancel, onSave }) => {
  const [form] = Form.useForm();

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
      <Form.Item
        label="Card Number"
        name="cardNumber"
        rules={[
          { required: true },
          { pattern: /^\d{4} \d{4} \d{4} \d{4}$/ },
        ]}
      >
        <Input
          placeholder="1234 5678 9012 3456"
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
              { required: true },
              { pattern: /^(0[1-9]|1[0-2])\/\d{2}$/ },
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
            rules={[{ required: true }, { pattern: /^\d{3}$/ }]}
          >
            <Input.Password maxLength={3} />
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
