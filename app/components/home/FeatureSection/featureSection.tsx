"use client";

import { Row, Col, Button } from "antd";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./featureSection.module.css";

export default function FeatureSection() {
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
        {/* LEFT CONTENT */}
        <Col
          xs={24}
          md={12}
          className={`${styles.contentCol} ${
            visible ? styles.contentAnimate : ""
          }`}
        >
          <h2 className={styles.title}>
            Transportation software for your business,
            no matter your size or budget.
          </h2>
          <p className={styles.text}>
            Dryva offers a customizable software solution to grow
            your business and manage your drivers.
          </p>
          <Button className={styles.cta}>About Us</Button>
        </Col>

        {/* RIGHT IMAGE */}
        <Col
          xs={24}
          md={12}
          className={`${styles.imageCol} ${
            visible ? styles.imageAnimate : ""
          }`}
        >
          <div className={styles.imageWrap}>
            <Image
              src="/images/cars.png"
              alt="Fleet Management"
              fill
              priority
            />
          </div>
        </Col>
      </Row>
    </section>
  );
}
