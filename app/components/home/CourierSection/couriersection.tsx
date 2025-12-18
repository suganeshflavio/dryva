"use client";

import { Row, Col, Button } from "antd";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./courierSection.module.css";

export default function CourierSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
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

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <Row
        align="middle"
        justify="space-between"
        gutter={[48, 48]}
      >
        {/* LEFT IMAGE */}
        <Col
          xs={24}
          md={12}
          className={`${styles.imageCol} ${
            visible ? styles.imageAnimate : ""
          }`}
        >
          <div className={styles.imageWrap}>
            <Image
              src="/images/courior.png"
              alt="Courier Service"
              fill
              priority
            />
          </div>
        </Col>

        {/* RIGHT CONTENT */}
        <Col
          xs={24}
          md={12}
          className={`${styles.contentCol} ${
            visible ? styles.contentAnimate : ""
          }`}
        >
          <h2 className={styles.title}>
            A better way to book a courier on demand
          </h2>
          <p className={styles.text}>
            Dryva courier service provides easy package delivery for
            individuals and SME business customers that value customer
            service and reliability.
          </p>
          <Button className={styles.cta}>Book Now</Button>
        </Col>
      </Row>
    </section>
  );
}
