"use client";

import { Button, message, Select } from "antd";
import Image from "next/image";
import styles from "./hero.module.css";
import { useRouter } from "next/navigation";
import GooglePlacesComboBox from "@/app/utils/GoogleMapsAutoComplete";
import { useState } from "react";
import { LocationType } from "@/app/Types/Location";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

type locationDescType = {
  pickup: string | null;
  drop: string | null;
};
export default function Hero() {
  const [PickupLocation, setPickupLocation] = useState<LocationType | null>(
    null,
  );
  console.log("PickupLocation", PickupLocation);

  const [LocationDesc, setLocationDesc] = useState<locationDescType>({
    pickup: null,
    drop: null,
  });
  const [DropLocation, setDropLocation] = useState<LocationType | null>(null);

  const onPickupSelect = (place: google.maps.places.PlaceResult) => {
    console.log("place selected", place);

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
    console.log("place selected", place);
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
  console.log("locations", LocationDesc);

  const route = useRouter();
  const handleAdd = () => {
    if (!PickupLocation || !DropLocation) {
      message.error("Pickup and Drop locations are required");
      return;
    }
    route.push("/addride");
  };
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
    <section className={styles.hero}>
      {/* <div className={styles.left}>
        <h1>Your trusted partner for every journey</h1>

        <Select
          defaultValue="Jamaica"
          className={styles.select}
          options={[{ value: "Jamaica", label: "Jamaica" }]}
        />

        <Button type="primary" size="large" className={styles.signupBtn}>
          See Options
        </Button>
      </div> */}
      <div className={styles.left}>
        {/* <span className={styles.tagline}>
    YOUR TRUSTED TRAVEL PARTNER
  </span> */}

        <h1 className={styles.title}>
          Your trusted partner for <br />
          every journey
        </h1>

        <div className={styles.searchBox}>
          {/* <div > */}
          <Select
            placeholder="Select location"
            className={styles.select}
            defaultValue="Jamaica"
            options={[
              { value: "jamaica", label: "Jamaica" },
              { value: "the bahamas", label: "The Bahamas" },
              { value: "turks and caicos", label: "Turks and Caicos" },
            ]}
            style={{ width: "71%", height: "50px" }}
          />

          {/* <Select
      placeholder="Pick up location"
      className={styles.select}
      options={[
        { value: "jamaica", label: "Jamaica" },
        { value: "barbados", label: "Barbados" },
      ]}
      style={{ width: '70%', height: '50px' }}
    /> */}
    <div style={{ width: "71%" }}>
          <GooglePlacesComboBox
            disabled={false}
            location={PickupLocation}
            placeholder="Enter Pickup Location"
            onSelect={onPickupSelect}
            size="large"
          />
</div>
          {/* <Select
      placeholder="Drop location"
      className={styles.select}
      options={[
        { value: "jamaica", label: "Jamaica" },
        { value: "barbados", label: "Barbados" },
      ]}
      style={{ width: '70%', height: '50px'}}
    /> */}
    <div style={{ width: "71%", }}>
          <GooglePlacesComboBox
            // disabled={!PickupLocation?.latitude || !PickupLocation?.longitude}
            location={DropLocation}
            placeholder="Enter Drop Location"
            onSelect={onDropSelect}
          />
          </div>
        </div>
        <Button className={styles.signupBtn} onClick={handleAdd}>
          See Options
        </Button>
      </div>
      {/* </div> */}

      <div className={styles.right}>
        <Image
          src="/images/hero.png"
          alt="Dryva"
          fill
          priority
        //   height={250}
        />
      </div>
    </section>
  );
}
