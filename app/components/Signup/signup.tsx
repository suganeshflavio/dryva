'use client';

import React, { useState } from 'react';
import { Row, Col, Form, Input, Button, Select, Typography, message } from 'antd';
import Image from 'next/image';
import { registerPassenger } from '@/app/api/Auth';
import PhoneInput, { isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './signup.css';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;
const { Option } = Select;

export default function SignupPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onFinish = async (values: any) => {
    const phone = parsePhoneNumber(values.mobile || '');
    console.log('Signup Data:', values);
    setLoading(true);
    try {
      const payload = {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        phone: phone?.nationalNumber,
        flag_code: phone?.country,
        country_code: `+${phone?.countryCallingCode}`,
        pickup: {
          lat: 11.0096912,
          lng: 77.0282813,
        },
      };

      await registerPassenger(payload);
      message.success('Registration successful');
      setLoading(false);
      router.push('/login');
      form.resetFields();
    } catch (error: unknown) {
      message.error(error instanceof Error ? error.message : 'Something went wrong');
      setLoading(false);
    } finally {
      setLoading(false);
    }

  };

  return (
    <>
      {/* Animations */}
      <style jsx global>{`
        @keyframes slideFromLeft {
          from {
            opacity: 0;
            transform: translateX(-80px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideFromRight {
          from {
            opacity: 0;
            transform: translateX(80px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      <Row style={{ minHeight: '100vh', background: '#fafafa' }}>
        {/* LEFT IMAGE */}
        <Col
          xs={0}
          md={12}
          style={{
            // padding: 32,
            display: 'flex',
            alignItems: 'center',
            animation: 'slideFromLeft 1s ease forwards',
          }}
        >
          <div
            style={{
              position: 'relative',
              marginTop: '80px',
              marginLeft: '90px',
              width: '80%',
              height: '80%',
              borderRadius: 20,
              overflow: 'hidden',
            }}
          >
            <Image
              src="/images/hero.png"
              alt="Dryva Signup"
              fill
              priority
              style={{ objectFit: 'cover' }}
            />
          </div>
        </Col>

        {/* RIGHT FORM */}
        <Col
          xs={24}
          md={12}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            animation: 'slideFromRight 1s ease forwards',
          }}
        >
          <div style={{ width: '100%', maxWidth: 420, height: '70%' }}>
            <Title level={2}>Welcome to Dryva</Title>
            <Text type="secondary">
              Create your account to get started
            </Text>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              style={{ marginTop: 12 }}
            >
              <Form.Item
                name="firstName"
                // label="First Name"
                rules={[
                  { required: true, message: 'Please enter first name' },
                ]}
              >
                <Input size="large" placeholder='Enter First Name' />
              </Form.Item>

              <Form.Item
                name="lastName"
                // label="Last Name"
                rules={[
                  { required: true, message: 'Please enter last name' },
                ]}
              >
                <Input size="large" placeholder='Enter Last Name' />
              </Form.Item>

              <Form.Item
                name="email"
                // label="Email"
                rules={[
                  { required: true, message: 'Email is required' },
                  { type: 'email', message: 'Enter a valid email' },
                ]}
              >
                <Input size="large" placeholder='Enter Email' />
              </Form.Item>

              <Form.Item
                name="mobile"
                // label="Mobile Number"
                rules={[
                  { required: true, message: 'Mobile number is required' },
                  // {
                  //   pattern: /^[0-9]{10}$/,
                  //   message: 'Enter a valid 10-digit number',
                  // },
                  {
                    validator: (_, value) =>
                      value && isValidPhoneNumber(value)
                        ? Promise.resolve()
                        : Promise.reject(
                          new Error('Enter a valid mobile number')
                        ),
                  }
                ]}
              >
                {/* <Input size="large" maxLength={10} placeholder='Enter Number'/> */}
                {/* <PhoneInput
    international
    defaultCountry="JM"
    countryCallingCodeEditable={false}
    inputComponent={Input as any}
    inputProps={{
      size: 'large',
      placeholder: 'Enter Mobile Number',
      type: 'tel',
    }}
    onChange={(value, country) => {
      form.setFieldsValue({
        mobile: value,
        countryCode: country?.countryCallingCode
          ? `+${country.countryCallingCode}`
          : '',
        flagCode: country?.country?.toUpperCase() || '',
      });
    }}
  /> */}
                <PhoneInput
                  international
                  defaultCountry="JM"
                  countryCallingCodeEditable={false}
                  value={form.getFieldValue('mobile')}
                  onChange={(value) => {
                    form.setFieldsValue({
                      mobile: value,
                    });
                  }}
                // inputComponent={CustomAntdInput}
                />
              </Form.Item>
              <Form.Item
                name="age"
                // label="Age"
                rules={[
                  { required: true, message: 'Please select your age' },
                ]}
              >
                <Select size="large" placeholder="Select Age">
                  <Option value="20 to 30">
                    20 to 30
                  </Option>
                  <Option value="30 to 40">
                    30 to 40
                  </Option>
                  <Option value="40 to 50">
                    40 to 50
                  </Option>
                  <Option value="50 +">
                    50 +
                  </Option>
                </Select>
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={loading}
                style={{ marginTop: 16, background: '#fe9900' }}
              >
                Sign Up
              </Button>

              <Text style={{ display: 'block', marginTop: 16 }}>
                Already have an account? <a href="/login">Login</a>
              </Text>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
}



export const CustomAntdInput = React.forwardRef<any, any>(
  ({ value, onChange, ...rest }, ref) => (
    <Input
      {...rest}
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      size="large"
      placeholder="Enter Mobile Number"
      type="tel"
    />
  )
);

CustomAntdInput.displayName = 'CustomAntdInput';