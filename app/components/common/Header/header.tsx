"use client";

import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Switch } from "antd";
import Link from "next/link";
import { useState } from "react";
import styles from "./header.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
    const router = useRouter();
    const NavSignup = () => {
        router.push("/signup");
    };
  return (
    <header className={`${styles.header} ${darkMode ? styles.dark : ""}`}>
      <div className={styles.logo}>
        <Image
          src="/images/dryva-logo.svg"
          alt="Dryva"
          width={100}
          height={50}
        />
      </div>

      {/* Desktop Menu */}
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>Home</Link>
        <Link href="/about" className={styles.navLink}>About Us</Link>
        <Link href="/faq" className={styles.navLink}>FAQ</Link>
        <Link href="/login" className={styles.navLink}>Login</Link>
        <Button className={styles.signupBtn} onClick={NavSignup}>Sign Up</Button>
        <Switch
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          style={{visibility:'hidden'}}
        />
      </nav>

      {/* Mobile */}
      <div className={styles.mobileMenu}>
        <Switch
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        style={{visibility:'hidden'}}
        />
        <MenuOutlined onClick={() => setOpen(true)} />
      </div>

      <Drawer
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Link href="/" className={styles.navLink}>Home</Link><br />
        <Link href="/about" className={styles.navLink}>About Us</Link><br />
        <Link href="/faq" className={styles.navLink}>FAQ</Link><br />
        <Link href="/login" className={styles.navLink}>Login</Link><br />
        <Button type="primary" block style={{ marginTop: 2 }}>
          Sign Up
        </Button>
      </Drawer>
    </header>
  );
}
