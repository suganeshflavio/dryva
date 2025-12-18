'use client';

import React from 'react'
import { Row, Col, Typography } from "antd";
import Image from "next/image";

export default function AboutDryva() {
  const { Title, Paragraph } = Typography;

  return (


    <Row style={{ position: "relative", width: "100%" }}>
      {/* Background Image */}
      <Image
        src="/images/hero-about.png"
        alt="About Dryva"
        fill
        priority
        style={{ objectFit: "cover" }}
      />

      {/* Overlay Content */}
      <Row
        align="middle"
        style={{
          position: "relative",
          minHeight: "90vh",
          width: "100%",
          padding: "25% 15% 0 15%",
        //   paddingTop: "350px",
          marginTop: "40px",
          background: "rgba(0,0,0,0.35)",
        }}
      >
        <Col xs={24} md={12}>
          <Title level={1} style={{ color: "#fff" }}>
            About Dryva
          </Title>

          <Paragraph style={{ color: "#fff", fontSize: 18 }}>
            Your trusted logistics and transportation provider
          </Paragraph>
        </Col>
      </Row>
    </Row>
  )
}