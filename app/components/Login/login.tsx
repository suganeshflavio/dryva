'use client';

import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Input, Button, Space, Form, Select } from 'antd';
import Image from 'next/image';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function LoginPage() {
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

    const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{ width: 70 }}
        defaultValue={'86'}
        options={[
          { label: '+86', value: '86' },
          { label: '+87', value: '87' },
        ]}
      />
    </Form.Item>
  );
  /* OTP Timer */
  useEffect(() => {
    if (step === 'otp' && timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
    if (timer === 0) setCanResend(true);
  }, [step, timer]);

  const handleSendOtp = () => {
    setStep('otp');
    setTimer(30);
    setCanResend(false);
  };

  const handleResendOtp = () => {
    setTimer(30);
    setCanResend(false);
  };

  return (
    <Row style={{ minHeight: '100vh' }}>
      {/* LEFT IMAGE */}
      <Col
        xs={0}
        md={12}
        style={{
          display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 32, // ← UI breathing space
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
    //   maxHeight: '85vh',
      borderRadius: 16,
      overflow: 'hidden',
    }}
  >
        <Image
          src="/images/hero.png"
          alt="Dryva Login"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
        </div>
      </Col>

      {/* RIGHT CONTENT */}
      <Col
        xs={24}
        md={12}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'slideFromRight 1s ease forwards',
        }}
        >
        <div style={{ width: '100%', maxWidth: 380 }}>
        {step === 'otp' && (
         <Button
             type="text"
             icon={<ArrowLeftOutlined />}
             onClick={() => setStep('mobile')}
             style={{marginBottom:'5px'}}
           > Back </Button>)}
          <Title level={2}>Welcome to Dryva</Title>
          <Text type="secondary" style={{ fontSize: 16 }}>
            Enter your mobile number to start your journey
          </Text>

          <Space direction="vertical" size="large" style={{ width: '100%', marginTop: 24 }}>
            {/* MOBILE NUMBER */}
            {step === 'mobile' && (
              <>
              <Space.Compact block>
          {prefixSelector}
                <Input
                  size="large"
                  placeholder="Enter Mobile Number"
                  type="tel"
                />
        </Space.Compact>

                <Button
                  type="primary"
                  size="large"
                  block
                  style={{ background: '#fe9900' }}
                  onClick={handleSendOtp}
                  htmlType="submit"
                >
                  Send OTP
                </Button>
                <Text style={{ display: 'block', }}>
                Don't have an account? <a href="/signup">Signup</a>
              </Text>
              </>
            )}

            {/* OTP */}
            {step === 'otp' && (
              <>
                <Input.OTP length={6} size="large" />
                <Text type="secondary">
                  {canResend ? (
                    <Button type="link" onClick={handleResendOtp}>
                      Resend OTP
                    </Button>
                  ) : (
                    <>Resend OTP in {timer}s</>
                  )}
                </Text>

                <Button
                  type="primary"
                  size="large"
                  block
                  style={{ background: '#fe9900' }}
                >
                  Verify & Login
                </Button>
              </>
            )}
          </Space>
        </div>
      </Col>

      {/* KEYFRAMES */}
      <style jsx global>{`
        @keyframes slideFromLeft {
          from {
            opacity: 0;
            transform: translateX(-120px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideFromRight {
          from {
            opacity: 0;
            transform: translateX(120px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </Row>
  );
}
