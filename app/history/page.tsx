"use client";

import { Card, Row, Col, Typography, Spin, Empty } from "antd";
import Image from "next/image";
import { Ride } from "@/app/Types/AddRide";
import { RideCard } from "../components/History/RideCard";
import AppFooter from "../components/common/Footer/footer";
import Header from "../components/common/Header/header";
import { useEffect, useState } from "react";
import { RideHistory } from "@/app/api/Ride";
import { mapRideHistory } from "../utils/mapRideHistory";

const { Title } = Typography;

export default function History() {
  // const [rides, setRides] = useState<Ride[]>([]);
  const [groups, setGroups] = useState<{ date: string; rides: Ride[] }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchRides = async () => {
      setLoading(true);
      try {
        const res = await RideHistory();
        const mapped = mapRideHistory(res);
        setGroups(mapped);
      } catch (err) {
        console.error("Failed to fetch ride history:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRides();
  }, []);
  return (
    <>
      <Header />
      <div style={{ padding: 24 }}>
        {/* Hero Section */}
        <Card
          style={{
            marginBottom: 24,
            borderRadius: 20,
            overflow: "hidden",
            marginTop: 52,
          }}
          bodyStyle={{ padding: 0 }}
        >
          <div style={{ position: "relative", height: 220, width: "100%" }}>
            <Image
              src="/images/book-history-bg.png" // place image in /public
              alt="Ride History"
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
              priority
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, rgba(0,0,0,.6), transparent)",
                display: "flex",
                alignItems: "center",
                paddingLeft: 32,
              }}
            >
              <Title style={{ color: "#fff", margin: 0 }}>Ride History</Title>
            </div>
          </div>
        </Card>

        {/* Grouped by Date */}
        {/* Loader */}
        {loading && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <Spin size="large" />
          </div>
        )}
        {!loading && groups.length === 0 && (
          <div style={{ padding: "80px 0" }}>
            <Empty description="No ride history found" />
          </div>
        )}

        {!loading &&
          groups.length > 0 &&
          groups.map((group) => (
            <div key={group.date} style={{ marginBottom: 32 }}>
              <Title level={5}>{new Date(group.date).toDateString()}</Title>

              <Row gutter={[16, 16]}>
                {group.rides.map((ride) => (
                  <Col xs={24} key={ride.id}>
                    <RideCard ride={ride} />
                  </Col>
                ))}
              </Row>
            </div>
          ))}
      </div>
      <AppFooter />
    </>
  );
}
