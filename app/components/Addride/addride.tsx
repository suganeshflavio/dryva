"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  DatePicker,
  TimePicker,
  InputNumber,
  Button,
  Typography,
  message,
  Radio,
  Tag,
  Select,
} from "antd";
import dayjs from "dayjs";
import VehicleAdd from "../VehicleAdd/vehicleadd";
import { CheckCircleOutlined } from "@ant-design/icons";
import GooglePlacesComboBox from "@/app/utils/GoogleMapsAutoComplete";
import {
  locationDescType,
  LocationType,
  LocationWithDescType,
} from "@/app/Types/Location";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { GetPlaceFromLatLng } from "@/app/utils/places";
import { EstimateRide } from "@/app/api/Ride";
import {
  EstimateTripPayload,
  VehicleEstimate,
} from "@/app/Types/AddRide";
import ProtectedRoute from "@/app/utils/ProtectedRoute";

const { Title } = Typography;

interface RideFormValues {
  pickup: string;
  drop: string;
  passengers: number;
  date: dayjs.Dayjs;
  time: dayjs.Dayjs;
  instructions?: string;
}

const HourlyOptions = [
  { value: "1", label: "1 Hour" },
  { value: "2", label: "2 Hours" },
  { value: "3", label: "3 Hours" },
  { value: "4", label: "4 Hours" },
  { value: "5", label: "5 Hours" },
  { value: "6", label: "6 Hours" },
  { value: "7", label: "7 Hours" },
  { value: "8", label: "8 Hours" },
];
const containerStyle = {
  width: "100%",
  height: "80vh",
  borderRadius: "8px",
};

const AddRide: React.FC = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(
    null,
  );
  const mapRef = useRef<google.maps.Map | null>(null);

  const [form] = Form.useForm<RideFormValues>();
  const [openRideModal, setOpenRideModal] = useState(false);
  const [VarReact, setVarReact] = useState<"outlined" | "solid">("outlined");
  const [Hourvalue, setHourvalue] = useState<string>("");
  const [rideType, setRideType] = useState<string>("is_per_ride");
  const [Stops, setStops] = useState<LocationWithDescType[]>([]);
  const [PickupLocation, setPickupLocation] = useState<LocationType | null>(
    null
  );
  const [DropLocation, setDropLocation] = useState<LocationType | null>(null);
  const [LocationDesc, setLocationDesc] = useState<locationDescType>({
    pickup: null,
    drop: null,
  });
  const [currency, setCurrency] = useState<string>("INR");
  const [estimates, setEstimates] = useState<VehicleEstimate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 18.1096,
    lng: -77.2975,
  });
  const [hasCentered, setHasCentered] = useState(false);
  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  const fitBounds = (points: { latitude: number; longitude: number }[]) => {
    if (!mapRef.current) return;

    const bounds = new google.maps.LatLngBounds();
    points.forEach((p) => {
      bounds.extend(new google.maps.LatLng(p.latitude, p.longitude));
    });

    mapRef.current.fitBounds(bounds);
  };
  const handleVari = () => {
    setVarReact((prev) => (prev === "outlined" ? "solid" : "outlined"));
  };
  const handleChange = (value: string) => {
    setHourvalue(value);
  };

  const handleAddStop = () => {
    if (Stops.length < 3) {
      setStops((prev) => [
        ...prev,
        { latitude: undefined, longitude: undefined, location_desc: null },
      ]);
    }
  };
useEffect(() => {
  const pickup = sessionStorage.getItem("PickupLocation");
  const drop = sessionStorage.getItem("DropLocation");
  const desc = sessionStorage.getItem("LocationDesc");

  if (pickup) {
    setPickupLocation(JSON.parse(pickup));
  }

  if (drop) {
    setDropLocation(JSON.parse(drop));
  }

  if (desc) {
    setLocationDesc(JSON.parse(desc));
  }
}, []);

  const onPickupSelect = (place: google.maps.places.PlaceResult) => {
    const lat = place.geometry?.location?.lat();
    const lng = place.geometry?.location?.lng();
    const address = place.formatted_address;
    if (lat && lng) {
      setPickupLocation({ latitude: lat, longitude: lng });
      if (typeof address === "string") {
        setLocationDesc((prev) => ({ ...prev, pickup: address }));
      }
    }
  };
  const onDropSelect = (place: google.maps.places.PlaceResult) => {
    const lat = place.geometry?.location?.lat();
    const lng = place.geometry?.location?.lng();
    const address = place.formatted_address;
    if (lat && lng) {
      setDropLocation({ latitude: lat, longitude: lng });
      if (typeof address === "string") {
        setLocationDesc((prev) => ({ ...prev, drop: address }));
      }
    }
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const tempCenter = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(tempCenter);
        },
        (error) => {
          console.error("Error getting location:", error);
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);
  // Set default date & time
  useEffect(() => {
    form.setFieldsValue({
      date: dayjs(),
      time: dayjs(),
      // passengers: 1,
    });
  }, [form]);

  // const onFinish = (values: RideFormValues) => {
  //   EstimateRide()
  //     setOpenRideModal(true);
  //   message.success("Searching rides...");
  // };
  const onFinish = async (values: RideFormValues) => {
    if (!PickupLocation || !DropLocation) {
      message.error("Pickup and Drop locations are required");
      return;
    }
    message.success("Searching rides...");

    const payload: EstimateTripPayload = {
      pickup: {
        lat: PickupLocation.latitude ?? 0,
        lng: PickupLocation.longitude ?? 0,
      },
      drop: {
        lat: DropLocation.latitude ?? 0,
        lng: DropLocation.longitude ?? 0,
      },
      is_round_trip: VarReact === "solid" && rideType != "is_hourly" ? true : false,
      is_hourly: rideType === "is_per_ride" ? false : true,
      total_hours: rideType === "is_hourly" ? Number(values.drop ?? 0) : 0,
      add_stop: Stops.map(
        (stop): LocationWithDescType => ({
          latitude: stop.latitude ?? 0,
          longitude: stop.longitude ?? 0,
          location_desc: stop.location_desc,
        }),
      ),
    };

    try {
      setLoading(true);

      const response = await EstimateRide(payload);

      setEstimates(response.estimates);
      setCurrency(response.currency || "INR");
      // setArrivalTime(response.approximate_arrival_time);

      setOpenRideModal(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const options = [
    { label: "Pay per ride", value: "is_per_ride" },
    { label: "Pay per hour", value: "is_hourly" },
  ];
  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    // initial center fit only once
    if (!hasCentered) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.setZoom(5);
      map.fitBounds(bounds);
      setHasCentered(true); // only once
    }

    if (inputContainerRef.current && buttonRef.current) {
      inputContainerRef.current.remove();
      buttonRef.current.remove();
      modalRef.current?.remove();

      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(
        inputContainerRef.current,
      );
      map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(
        buttonRef.current,
      );
      map.controls[google.maps.ControlPosition.TOP_CENTER].push(
        modalRef.current!,
      );
    }

    directionsRendererRef.current = new google.maps.DirectionsRenderer({
      suppressMarkers: false, // show Google markers, set true if you want your own markers
      polylineOptions: {
        strokeColor: "#f97316", // orange
        strokeWeight: 5,
      },
    });
    directionsRendererRef.current.setMap(map);

    mapRef.current = map;
    setMap(map);
  }, []); // <-- no Pickup/Drop dependency

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
    directionsRendererRef.current?.setMap(null);
    mapRef.current = null;
  }, []);

  useEffect(() => {
    if (
      PickupLocation?.latitude &&
      PickupLocation?.longitude &&
      DropLocation?.latitude &&
      DropLocation?.longitude &&
      mapRef.current
    ) {
      const directionsService = new google.maps.DirectionsService();

      directionsService.route(
        {
          origin: {
            lat: PickupLocation.latitude,
            lng: PickupLocation.longitude,
          },
          destination: {
            lat: DropLocation.latitude,
            lng: DropLocation.longitude,
          },
          travelMode: google.maps.TravelMode.DRIVING,
          waypoints: Stops.filter(
            (s) =>
              typeof s.latitude === "number" && typeof s.longitude === "number",
          ).map((s) => ({
            location: {
              lat: s.latitude as number,
              lng: s.longitude as number,
            } as google.maps.LatLngLiteral,
          })),
          optimizeWaypoints: false, // set true if you want Google to reorder stops for best route
        },
        (result, status) => {
          if (status === "OK" && result) {
            directionsRendererRef.current?.setDirections(result);
          } else {
            console.error("Directions request failed:", status);
          }
        },
      );
    }
  }, [PickupLocation, DropLocation, Stops]);
  const onDropMarker = async (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    const lat = e.latLng?.lat();
    const lng = e.latLng?.lng();
    if (lat && lng) {
      setDropLocation({ latitude: lat, longitude: lng });
      const address = await GetPlaceFromLatLng(lat, lng);
      if (address && typeof address === "string") {
        setLocationDesc({ ...LocationDesc, drop: address });
      }
    }
  };
  const onPickupMarker = async (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    const lat = e.latLng?.lat();
    const lng = e.latLng?.lng();
    if (lat && lng) {
      setPickupLocation({ latitude: lat, longitude: lng });
      const address = await GetPlaceFromLatLng(lat, lng);
      if (address && typeof address === "string") {
        setLocationDesc({ ...LocationDesc, pickup: address });
      }
    }
  };

  useEffect(() => {
    if (
      PickupLocation?.latitude !== undefined &&
      PickupLocation?.longitude !== undefined &&
      DropLocation?.latitude !== undefined &&
      DropLocation?.longitude !== undefined
    ) {
      let allStops = [
        {
          latitude: PickupLocation.latitude,
          longitude: PickupLocation.longitude,
        },
        { latitude: DropLocation.latitude, longitude: DropLocation.longitude },
      ];
      if (Stops.length > 0) {
        const middleStops = Stops.filter(
          (stop) => stop.latitude !== undefined && stop.longitude !== undefined,
        ).map((stop) => ({
          latitude: stop.latitude!,
          longitude: stop.longitude!,
        }));
        allStops = [
          {
            latitude: PickupLocation.latitude,
            longitude: PickupLocation.longitude,
          },
          ...middleStops,
          {
            latitude: DropLocation.latitude,
            longitude: DropLocation.longitude,
          },
        ];
      }
      fitBounds(allStops);
    }
  }, [PickupLocation, DropLocation]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setCenter(center);
      mapRef.current.setZoom(10);
      fitBounds([{ latitude: center.lat, longitude: center.lng }]);
    }
  }, [center]);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY!,
    libraries: ["maps", "places", "marker", "drawing"],
    // libraries:["places","maps"]
  });
  if (!isLoaded) {
    return <div>Loading Map...</div>;
  }
  return (
    <ProtectedRoute>
      <Row gutter={[24, 24]}>
        {/* LEFT FORM */}
        <Col xs={24} md={10} lg={8}>
          <Card
            style={{
              marginTop: "90px",
              marginLeft: "70px",
              maxHeight: "120vh",
            }}
          >
            <Title level={4}>Book a Ride</Title>
            <Radio.Group
              block
              options={options}
              defaultValue="is_per_ride"
              onChange={(e) => {
                setRideType(e.target.value);
                setStops([]);
              }}
              style={{ marginBottom: "10px" }}
            />
            <Form
              layout="vertical"
              form={form}
              onFinish={onFinish}
              requiredMark={false}
            >
              {/* <Form.Item
              name="pickup"
            //   label="Pickup Location"
              rules={[{ required: true, message: 'Pickup location is required' }]}
            >
              <Input placeholder="Enter pickup location" />
            </Form.Item> */}
              {/* <Form.Item
              name="pickup"
              rules={[{ required: true, message: 'Pickup location is required' }]}
            > */}
              <GooglePlacesComboBox
                location={PickupLocation}
                placeholder="Enter pickup location"
                onSelect={onPickupSelect}
              // size="middle"
              />
              {/* </Form.Item> */}
              {Stops.map((stop, index) => (
                <div key={index} className="flex items-center gap-2 mt-2">
                  {/* <Form.Item
                    name="additional_stop"
                    //   label="Date"
                    rules={[{ required: true, message: `Stop ${index + 1} location is required` }]}
                  > */}
                  <GooglePlacesComboBox
                    disabled={
                      !PickupLocation?.latitude || !PickupLocation?.longitude
                    }
                    location={stop}
                    placeholder={`Stop ${index + 1}`}
                    onSelect={(place) => {
                      const lat = place.geometry?.location?.lat();
                      const lng = place.geometry?.location?.lng();
                      const address = place.formatted_address;
                      if (lat && lng) {
                        const newStops = [...Stops];
                        newStops[index] = {
                          latitude: lat,
                          longitude: lng,
                          location_desc: address || null,
                        };
                        setStops(newStops);
                      }
                    }}
                  />
                  {/* </Form.Item> */}
                  <button
                    onClick={() => {
                      setStops((prev) => prev.filter((_, i) => i !== index));
                    }}
                    aria-label="Remove"
                    className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition-shadow shadow-md"
                    title="Remove"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line
                        x1="5"
                        y1="12"
                        x2="19"
                        y2="12"
                        stroke="white"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}
              {rideType === "is_per_ride" && (
                <button
                  onClick={handleAddStop}
                  aria-label="Add"
                  className={
                    "inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange-500  hover:bg-orange-600 active:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-300 transition-shadow shadow-md mt-2" +
                    (Stops.length >= 3 ? " cursor-not-allowed opacity-50" : "")
                  }
                  title="Add"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line
                      x1="12"
                      y1="5"
                      x2="12"
                      y2="19"
                      stroke="white"
                      strokeLinecap="round"
                    />
                    <line
                      x1="5"
                      y1="12"
                      x2="19"
                      y2="12"
                      stroke="white"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              )}
              {rideType === "is_per_ride" && (
                <div className="mb-1">
                  <GooglePlacesComboBox
                    disabled={
                      !PickupLocation?.latitude || !PickupLocation?.longitude
                    }
                    location={DropLocation}
                    placeholder="Enter Drop Location"
                    onSelect={onDropSelect}
                  />
                </div>
              )}

              {/* <Row gutter={12}> */}
              {/* <Col span={12}> */}
              <Form.Item
                style={{ marginTop: '20px' }}
                name="small suitcase"
                //   label="Passengers"
                rules={[
                  {
                    required: true,
                    message: "Number of small suitcases is required",
                  },
                  {
                    type: "number",
                    max: 10,
                    message: "Maximum 10 small suitcases allowed",
                  },
                ]}
              >
                <InputNumber
                  min={0}
                  max={10}
                  style={{ width: "100%" }}
                  placeholder="Enter number of small suitcases"
                />
              </Form.Item>
              {/* </Col>
              <Col span={12}> */}
              <Form.Item
                name="large suitcase"
                //   label="Passengers"
                rules={[
                  {
                    required: true,
                    message: "Number of large suitcases is required",
                  },
                  {
                    type: "number",
                    max: 10,
                    message: "Maximum 10 large suitcases allowed",
                  },
                ]}
              >
                <InputNumber
                  min={0}
                  max={10}
                  style={{ width: "100%" }}
                  placeholder="Enter number of large suitcases"
                />
              </Form.Item>
              {/* </Col> */}
              {/* </Row> */}
              {rideType === "is_hourly" && (
                <Form.Item
                  name="drop"
                  //   label="Drop Location"
                  rules={[{ required: true, message: "Please select hours" }]}
                >
                  <Select
                    // defaultValue="2 Hours"
                    value={Hourvalue}
                    placeholder="Select Hours"
                    style={{ width: "100%" }}
                    onChange={handleChange}
                    options={HourlyOptions}
                  />
                </Form.Item>
              )}
              <Form.Item
                name="passengers"
                //   label="Passengers"
                rules={[
                  {
                    required: true,
                    message: "Number of passengers is required",
                  },
                  {
                    type: "number",
                    min: 1,
                    message: "At least 1 passenger is required",
                  },
                  {
                    type: "number",
                    max: 6,
                    message: "Maximum 6 passengers allowed",
                  },
                ]}
              >
                <InputNumber
                  min={1}
                  max={6}
                  style={{ width: "100%" }}
                  placeholder="Enter number of passengers"
                />
              </Form.Item>

              <Row gutter={12}>
                <Col span={12}>
                  <Form.Item
                    name="date"
                    //   label="Date"
                    rules={[{ required: true }]}
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      disabledDate={(current) =>
                        current && current < dayjs().startOf("day")
                      }
                      placeholder="Select date"
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="time"
                    //   label="Time"
                    rules={[{ required: true }]}
                  >
                    <TimePicker
                      style={{ width: "100%" }}
                      format="HH:mm"
                      placeholder="Select time"
                    />
                  </Form.Item>
                </Col>
              </Row>
              {/*
            <Form.Item name="instructions"
            //  label="Pickup Instructions"
             >
              <Input.TextArea
                rows={3}
                placeholder="Contact person, airline, flight number, etc."
              />
            </Form.Item> */}
              {rideType === "is_per_ride" && (
                <Tag
                  color="warning"
                  icon={<CheckCircleOutlined />}
                  variant={VarReact}
                  onClick={handleVari}
                  style={{ cursor: "pointer", marginBottom: "10px" }}
                >
                  Round-Trip
                </Tag>
              )}
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                size="large"
                style={{ background: "#fe9900" }}
              >
                Search
              </Button>
            </Form>
          </Card>
        </Col>
        {openRideModal && (
          // <div>
          <VehicleAdd
            open={openRideModal}
            onClose={() => setOpenRideModal(false)}
            estimates={estimates}
            currency={currency}
            PickupLocation={PickupLocation}
            DropLocation={DropLocation}
            LocationDesc={LocationDesc}
            Stops={Stops}
            values={form.getFieldsValue()}
            rideType={rideType}
            VarReact={VarReact}
          />
        )}
        {/* RIGHT MAP */}
        <Col
          xs={24}
          md={14}
          lg={16}
          style={{ marginTop: "90px", maxHeight: "120vh" }}
        >
          <Card style={{ height: "99%" }}>
            {/* <iframe
            title="map"
            src="https://www.google.com/maps?q=Ewarton,Jamaica&z=10&output=embed"
            style={{
              border: 0,
              width: '90%',
              height: '100%',
              minHeight: 520,
              borderRadius: 8,
            }}
            loading="lazy"
          /> */}
            {/* <div className="flex gap-2"> */}
            <GoogleMap
              mapContainerClassName="map-div"
              mapContainerStyle={containerStyle}
              zoom={10}
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={{
                disableDefaultUI: true,
              }}
            >
              {/* Child components, such as markers, info windows, etc. */}

              {PickupLocation?.latitude !== undefined &&
                PickupLocation?.longitude !== undefined && (
                  <Marker
                    draggable
                    onDragEnd={(e) => onPickupMarker(e)}
                    position={{
                      lat: PickupLocation.latitude,
                      lng: PickupLocation.longitude,
                    }}
                    icon={{
                      url: "/images/icons/pin.png",
                      scaledSize: new google.maps.Size(60, 60),
                    }}
                  />
                )}

              {Stops.map(
                (stop, index) =>
                  stop.latitude !== undefined &&
                  stop.longitude !== undefined && (
                    <Marker
                      key={index}
                      draggable
                      onDragEnd={async (e) => {
                        if (!e.latLng) return;
                        const lat = e.latLng.lat();
                        const lng = e.latLng.lng();
                        const address = await GetPlaceFromLatLng(lat, lng);
                        setStops((prev) => {
                          const newStops = [...prev];
                          newStops[index] = {
                            latitude: lat,
                            longitude: lng,
                            location_desc: address || null,
                          };
                          return newStops;
                        });
                      }}
                      position={{
                        lat: stop.latitude,
                        lng: stop.longitude,
                      }}
                      label={`stop ${index + 1}`}
                      icon={{
                        url: "/images/icons/pin.png", // Different icon for stops
                        scaledSize: new google.maps.Size(60, 60),
                      }}
                    />
                  ),
              )}

              {DropLocation?.latitude !== undefined &&
                DropLocation?.longitude !== undefined && (
                  <Marker
                    draggable
                    onDragEnd={(e) => {
                      onDropMarker(e);
                    }}
                    position={{
                      lat: DropLocation.latitude,
                      lng: DropLocation.longitude,
                    }}
                    icon={{
                      url: "/images/icons/pin.png",
                      scaledSize: new google.maps.Size(60, 60),
                    }}
                  />
                )}
            </GoogleMap>
            {/* </div> */}
          </Card>
        </Col>
      </Row>
    </ProtectedRoute>
  );
};

export default AddRide;
