"use client";

import React, { useState } from 'react'
import { Row, Col, Typography, Space, Button, Divider, Flex } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import Trems from '../../Terms/Trems';

const { Text, Link } = Typography;

export default function AppFooter() {
  const year = new Date().getFullYear();
const [openResponsive, setOpenResponsive] = useState(false);

  return (
    <footer style={{ background: "#000", padding: "64px 100px 24px" }}>
      {/* TOP SECTION */}
      <Row gutter={[32, 32]} align="middle">
        {/* LEFT CONTENT */}
        <Col xs={24} md={12}>
          <Space direction="vertical" size="middle">
            {/* <Text style={{ color: "#FE9900", fontSize: 28, fontWeight: 700 }}>
              Dryva
            </Text> */}
            <Image src={'/images/dryva-logo.svg'} alt='Dryva Logo' height={50} width={80}/>
            <Text style={{ color: "#fff" }}>
              Dryva is a registered trademark
            </Text>

          <Space>
  <PhoneOutlined style={{ color: "#fff" }} />
  <Typography.Link
    href="tel:+18765790617"
    style={{ color: "#fff" }}
  >
    WhatsApp 876-579-0617
  </Typography.Link>
</Space>

<Space>
  <MailOutlined style={{ color: "#fff" }} />
  <Typography.Link
    href="mailto:hello@dryva.com"
    style={{ color: "#fff" }}
  >
    hello@dryva.com
  </Typography.Link>
</Space>


            <Space>
              <EnvironmentOutlined style={{ color: "#fff" }} />
              <Text style={{ color: "#fff" }}>
                22 Trafalgar Road, Unit 11, Kingston 10
              </Text>
            </Space>
          </Space>
        </Col>

        {/* RIGHT ACTIONS */}
        <Col xs={24} md={12}>
          <Flex
            justify="center"
            align="center"
            gap="large"
            wrap="wrap"
          >
            <Button
              type="primary"
              size="large"
              style={{
                backgroundColor: "#fff",
                color: "#000",
                fontWeight: 600,
                borderRadius: 50,
                padding: "0 42px",
                height: 48,
              }}
            >
              Sign Up
            </Button>

           <Space size="large" wrap>
  {/* Google Play */}
  {/* <a
    href="https://play.google.com/store"
    target="_blank"
    rel="noopener noreferrer"
  > */}
    <Image
      src="/images/Google@2x.png"
      alt="Get it on Google Play"
      width={160}
      height={48}
      priority
    />
  {/* </a> */}

  {/* Apple Store */}
  {/* <a
    href="https://www.apple.com/app-store/"
    target="_blank"
    rel="noopener noreferrer"
  > */}
    <Image
      src="/images/Apple@2x.png"
      alt="Download on the App Store"
      width={160}
      height={48}
      priority
    />
  {/* </a> */}
</Space>
          </Flex>
        </Col>
      </Row>

      {/* DIVIDER */}
      <Divider style={{ borderColor: "#333", margin: "48px 0 24px" }} />

      {/* BOTTOM BAR */}
      <Row justify="space-between" align="middle" gutter={[16, 16]}>
        <Col xs={24} md="auto">
          <Text style={{ color: "#fff" }}>
            © {year} Dryva. All Rights Reserved.
          </Text>
        </Col>
        <Col xs={24} md="auto">
          <Link style={{ color: "#fff" }} onClick={() => setOpenResponsive(true)}>
            Terms & Conditions
          </Link>
          {openResponsive && (
            <div>
              {/* Modal content for Terms & Conditions */}
            <Trems openResponsive={openResponsive} setOpenResponsive={setOpenResponsive}/>
            </div>
            )}
        </Col>
      </Row>
    </footer>
  );
}
