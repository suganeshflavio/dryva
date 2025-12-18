"use client";

import { Button, Select } from "antd";
import Image from "next/image";
import styles from "./hero.module.css";
import { useRouter } from "next/navigation";

export default function Hero() {
    const route = useRouter();
    const handleAdd = () => {
        route.push('/addride');
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
      options={[
        { value: "jamaica", label: "Jamaica" },
        { value: "barbados", label: "Barbados" },
      ]}
      style={{ width: '70%', height: '50px' }}
    />

 <Select
      placeholder="Pick up location"
      className={styles.select}
      options={[
        { value: "jamaica", label: "Jamaica" },
        { value: "barbados", label: "Barbados" },
      ]}
      style={{ width: '70%', height: '50px' }}
    />

 <Select
      placeholder="Drop location"
      className={styles.select}
      options={[
        { value: "jamaica", label: "Jamaica" },
        { value: "barbados", label: "Barbados" },
      ]}
      style={{ width: '70%', height: '50px'}}
    />
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
