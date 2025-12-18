"use client";

import { Row, Col, Button } from "antd";
import Image from "next/image";
import styles from "./appPromo.module.css";
import { useEffect, useRef, useState } from "react";

export default function AppPromo() {

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
    <section className={styles.section}>
      <Row
        align="middle"
        justify="space-between"
        gutter={[48, 48]}
        className={styles.row}
      >
        {/* LEFT CONTENT */}
        <Col xs={24} md={12} className={styles.left}>
          <h2 className={styles.title}>Dryva at your fingertips</h2>
          <p className={styles.text}>
            The app will allow you to schedule a driver in a matter of minutes.
          </p>
          <Button size="large" className={styles.cta}>
            Get the App
          </Button>
        </Col>

        {/* RIGHT IMAGE */}
        <Col xs={24} md={12}
className={`${styles.imageCol} ${
            visible ? styles.imageAnimate : ""
          }`}
        // className={styles.right}
        >
          <div className={styles.phoneWrap}>
            <Image
              src="/images/app.png"
              alt="Dryva App"
              fill
              priority
            />
          </div>
        </Col>
      </Row>
    </section>
  );
}
