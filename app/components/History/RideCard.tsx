// 'use client';

// import React, { useState } from "react";
// import { Ride } from "@/app/Types/AddRide";
// import { Button, Card, Col, Row, Tag, Typography } from "antd";

// interface Props {
//   ride: Ride;
// }

// export const RideCard: React.FC<Props> = ({ ride }) => {
//   const [expanded, setExpanded] = useState(false);
//   const { Text } = Typography;

//   return (
//     <Card
//       hoverable
//       style={{ borderRadius: 16 }}
//       bodyStyle={{ padding: 20 }}
//       onClick={() => setExpanded(!expanded)}
//     >
//       <Row gutter={[16, 12]} align="middle">
//         <Col xs={24} md={6}>
//           <Text strong>Booking ID</Text>
//           <div>{ride.bookingId}</div>
//         </Col>

//         <Col xs={12} md={4}>
//           <Text strong>Vehicle</Text>
//           <div>{ride.vehicle}</div>
//         </Col>

//         <Col xs={12} md={6}>
//           <Text strong>Date & Time</Text>
//           <div>{ride.dateTime}</div>
//         </Col>

//         <Col xs={12} md={4}>
//           <Text strong>Fare</Text>
//           <div>₹ {ride.fare}</div>
//         </Col>

//         <Col xs={12} md={4}>
//           <Tag color="cyan">{ride.status}</Tag>
//         </Col>
//       </Row>

//       {expanded && (
//         <div style={{ marginTop: 16 }}>
//           <Row gutter={[16, 8]}>
//             <Col xs={24} md={12}>
//               <Text strong>Pickup</Text>
//               <div>{ride.pickup}</div>
//             </Col>

//             <Col xs={24} md={12}>
//               <Text strong>Drop</Text>
//               <div>{ride.drop}</div>
//             </Col>

//             <Col xs={12}>
//               <Text strong>Distance</Text>
//               <div>{ride.distance}</div>
//             </Col>
//           </Row>
//         </div>
//       )}

//       <div style={{ textAlign: 'right', marginTop: 12 }}>
//         <Button type="link" onClick={() => setExpanded(!expanded)}>
//           {expanded ? 'Show Less' : 'More Details'}
//         </Button>
//       </div>
//     </Card>
//   );
// };

"use client";

import { Button, Card, Col, Row, Tag, Typography } from "antd";
import { Ride } from "@/app/Types/AddRide";
import { useState } from "react";

const { Text } = Typography;

export const RideCard: React.FC<{ ride: Ride }> = ({ ride }) => {
  const [expanded, setExpanded] = useState(false);
  const formatDateTime = (dateTime: string): string => {
    // Convert "YYYY-MM-DD HH:mm:ss" → ISO
    const iso = dateTime.replace(" ", "T");

    const date = new Date(iso);

    const formattedDate = date.toLocaleDateString("en-US");
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    return `${formattedDate} , ${formattedTime}`;
  };

  return (
    <Card
      hoverable
      style={{ borderRadius: 16 }}
      onClick={() => setExpanded(!expanded)}
    >
      <Row gutter={[16, 12]}>
        <Col xs={24} md={6}>
          <Text strong>Booking ID</Text>
          <div>{ride.bookingId}</div>
        </Col>

        <Col xs={12} md={4}>
          <Text strong>Vehicle</Text>
          <div>{ride.vehicle}</div>
        </Col>

        <Col xs={12} md={6}>
          <Text strong>Date & Time</Text>
          <div>{formatDateTime(ride.dateTime)}</div>
        </Col>

        <Col xs={12} md={4}>
          <Text strong>Fare</Text>
          <div>₹ {ride.fare}</div>
        </Col>

        <Col xs={12} md={4}>
          <Tag
            color={
              ride.status === "Cancelled"
                ? "red"
                : ride.status === "Completed"
                  ? "green"
                  : "cyan"
            }
          >
            {ride.status}
          </Tag>
        </Col>
      </Row>

      {expanded && (
        <Row gutter={[16, 8]} style={{ marginTop: 16 }}>
          <Col xs={12}>
            <Text strong>Pickup</Text>
            <div>{ride?.location_description?.pickup || "-"}</div>
          </Col>
          <Col xs={12}>
            <Text strong>Drop</Text>
            <div>{ride?.location_description?.drop || "-"}</div>
          </Col>
          <Col xs={12}>
            <Text strong>Distance</Text>
            <div>{ride.distance}</div>
          </Col>

          <Col xs={12}>
            <Text strong>Passengers</Text>
            <div>{ride.passengers}</div>
          </Col>

          <Col xs={12}>
            <Text strong>Hourly Ride</Text>
            <div>{ride.isHourly ? "Yes" : "No"}</div>
          </Col>

          <Col xs={12}>
            <Text strong>Round Trip</Text>
            <div>{ride.isRoundTrip ? "Yes" : "No"}</div>
          </Col>
        </Row>
      )}

      <div style={{ textAlign: "right", marginTop: 12 }}>
        <Button type="link" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Show Less" : "More Details"}
        </Button>
      </div>
    </Card>
  );
};
