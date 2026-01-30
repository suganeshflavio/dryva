"use client";

import React, { useState } from "react";
import {
  Modal,
  Card,
  Typography,
  Space,
  Button,
  Row,
  Col,
  message,
} from "antd";
import { CreditCardOutlined } from "@ant-design/icons";
import CardSelector from "../Cards/CardSelector";
import { CreateTripPayload, VehicleEstimate } from "@/app/Types/AddRide";
import { CreateTrip } from "@/app/api/Ride";
import {
  locationDescType,
  LocationType,
  LocationWithDescType,
} from "@/app/Types/Location";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

type Step = "ride" | "card";

interface Ride {
  id: string;
  title: string;
  description: string;
  price: number;
  capacity: number;
  image: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  estimates: VehicleEstimate[];
  currency: string;
  PickupLocation: LocationType | null;
  DropLocation: LocationType | null;
  LocationDesc: locationDescType;
  Stops: LocationWithDescType[];
  values: any;
  rideType?: string;
  VarReact?: string;
}

const ChooseRideModal: React.FC<Props> = ({
  open,
  onClose,
  estimates,
  currency,
  PickupLocation,
  DropLocation,
  LocationDesc,
  Stops,
  values,
  rideType,
  VarReact,
}) => {
  const [step, setStep] = useState<Step>("ride");
  const [selected, setSelected] = useState<VehicleEstimate>(estimates[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cardId, setCardId] = useState<string | null>(null);
  const router = useRouter();

  const handleVehicleSelect = (ride: VehicleEstimate) => {
    setSelected(ride);
  };
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const offset = new Date().getTimezoneOffset();
  const { date, time } = values;

  // Combine date and time
  const combinedDateTime = date
    .hour(time.hour())
    .minute(time.minute())
    .second(0);

  const formatted = combinedDateTime.format("YYYY-MM-DD HH:mm:ss");
  console.log("formatted", formatted);

  const handleCreateTrip = async () => {
    // Logic to create trip with selected vehicle and payment method
    if (!selected) {
      message.error("No vehicle selected");
      return;
    }
    if (!cardId) {
      message.error("Please select a card payment method");
      return;
    }
    const payload: CreateTripPayload = {
      small_suitcase: values.small_suitcase || "0",
      large_suitcase: values.large_suitcase || "0",
      total_passengers: String(values.passengers || "1"),
      date_time: formatted,
      distance_units: selected.unit,
      est_distance: selected.distance,
      est_time: selected.estimated_duration_minutes,
      est_price: selected.total_amount,
      driver_mapping: null,
      is_round_trip:
        VarReact === "solid" && rideType != "is_hourly" ? true : false,
      is_hourly: rideType === "is_hourly" ? true : false,
      total_hours: rideType === "is_hourly" ? Number(values.drop ?? 0) : 0,
      payment_method_id: cardId,
      tz_str: timeZone,
      tz_offset: offset,
      vehicle_type_id: selected.vehicle_type_id,
      boundary_id: selected.boundary_id,
      pickup: {
        lat: PickupLocation?.latitude ?? 0,
        lng: PickupLocation?.longitude ?? 0,
      },
      drop: {
        lat: DropLocation?.latitude ?? 0,
        lng: DropLocation?.longitude ?? 0,
      },
      add_stop: Stops.map(
        (stop): LocationWithDescType => ({
          latitude: stop.latitude ?? 0,
          longitude: stop.longitude ?? 0,
          location_desc: stop.location_desc,
        }),
      ),
      location_description: LocationDesc,
    };
    try {
      setIsLoading(true);
      const response = await CreateTrip(payload);
      console.log("Trip Created Successfully:", response);
      message.success("Trip Created Successfully");
      onClose();
      sessionStorage.removeItem("PickupLocation");
      sessionStorage.removeItem("DropLocation");
      sessionStorage.removeItem("LocationDesc");
      router.push("/history");
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      centered
      open={open}
      onCancel={onClose}
      footer={null}
      width={{
        xs: "95%",
        sm: 420,
        md: 480,
        lg: 520,
      }}
    >
      {step === "ride" && (
        <>
          <Title level={4}>Choose a Ride</Title>

          <Space direction="vertical" size={16} style={{ width: "100%" }}>
            {estimates.map((ride) => (
              <Card
                key={ride.vehicle_type_id}
                hoverable
                onClick={() => handleVehicleSelect(ride)}
                style={{
                  border:
                    selected.vehicle_type_id === ride.vehicle_type_id
                      ? "2px solid #fe9900"
                      : "1px solid #f0f0f0",
                  borderRadius: 12,
                }}
              >
                <Row align="middle" gutter={16}>
                  <Col>
                    <img
                      src={ride.icon_url}
                      alt={ride.vehicle_name}
                      style={{ width: 64 }}
                    />
                  </Col>

                  <Col flex="auto">
                    <Text strong>{ride.vehicle_name}</Text>
                    <br />
                    <Text type="secondary">
                      {ride.estimated_duration_minutes} min
                    </Text>
                    <br />
                    <Space size={6}>
                      {/* <UserOutlined /> */}
                      <Text>
                        {/* {ride.capacity} */}
                        {ride.distance.toFixed(2)} {ride.unit} away
                      </Text>
                    </Space>
                  </Col>

                  <Col>
                    <Text strong>
                      {ride.total_amount.toFixed(2)}{" "}
                      <Text type="secondary">{currency}</Text>
                    </Text>
                  </Col>
                </Row>
              </Card>
            ))}
          </Space>

          {/* Footer Actions */}
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 24,
            }}
          >
            <Button
              block
              icon={<CreditCardOutlined />}
              onClick={() => setStep("card")}
            >
              Select Card
            </Button>

            <Button
              block
              loading={isLoading}
              type="primary"
              style={{ background: "#fe9900" }}
              onClick={handleCreateTrip}
            >
              Book Now ({selected.total_amount.toFixed(2)})
            </Button>
          </div>
        </>
      )}
      {step === "card" && (
        <>
          <Space align="center" size={5}>
            {/* <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={() => setStep('ride')}
              style={{marginBottom:'15px'}}
            /> */}
            {/* <Title level={4}>Select Card</Title> */}
          </Space>
          <CardSelector
            onDone={() => setStep("ride")}
            // selected={selected}
            // cardId={cardId}
            onCardSelect={setCardId}
          />
        </>
      )}
    </Modal>
  );
};

export default ChooseRideModal;
