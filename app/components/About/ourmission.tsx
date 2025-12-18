'use client';

import { Row, Col, Typography } from 'antd';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const { Title, Paragraph } = Typography;

export default function OurMission() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Row
        ref={sectionRef}
        align="middle"
        justify="space-between"
        gutter={[32, 32]}
        style={{ padding: '36px 86px', width: '100%' }}
      >
        {/* Left Content */}
        <Col xs={24} md={12}>
          <Title
            level={2}
            className={visible ? 'slide-left' : 'hidden'}
          >
            Our Mission
          </Title>

          <Paragraph
            className={visible ? 'slide-left' : 'hidden'}
            style={{ animationDelay: '0.2s', fontSize: 18 }}
          >
            To continuously improve the efficiency and customer experience
            provided by our people and our technology.
          </Paragraph>
        </Col>

        {/* Right Image */}
        <Col xs={24} md={12} style={{ textAlign: 'center' }}>
          <div className={visible ? 'slide-right' : 'hidden'}>
            <Image
              src="/images/About-Mission1.png"
              alt="Our Mission"
              width={450}
              height={450}
              style={{ borderRadius: 16 }}
            />
          </div>
        </Col>
      </Row>

      {/* Animation only – no layout styling */}
      <style jsx>{`
        .hidden {
          opacity: 0;
        }

        .slide-left {
          opacity: 0;
          transform: translateX(-40px);
          animation: fromLeft 0.8s ease-out forwards;
        }

        .slide-right {
          opacity: 0;
          transform: translateX(40px);
          animation: fromRight 0.8s ease-out forwards;
        }

        @keyframes fromLeft {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fromRight {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
